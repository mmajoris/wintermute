"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import HudFrame from "@/components/ui/HudFrame";

// ─── Data Types ────────────────────────────────────────────────────────

interface Node {
  id: number;
  position: [number, number, number];
  region: string;
  baseColor: [number, number, number];
  activationLevel: number;
  lastActivation: number;
}

interface Edge {
  sourceId: number;
  targetId: number;
  weight: number;
  lastSignalTime: number;
}

// ─── Shader Material for Neurons ─────────────────────────────────────

const NeuronMaterial = shaderMaterial(
  {
    time: 0,
    baseColor: new THREE.Color(0x00c8dc),
  },
  /*glsl*/ `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying float vActivation;
    
    attribute float activationLevel;
    
    void main() {
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      vActivation = activationLevel;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /*glsl*/ `
    uniform float time;
    uniform vec3 baseColor;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying float vActivation;
    
    void main() {
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - dot(viewDir, vNormal), 1.5);
      
      // Emissive intensity driven by activation
      float emissive = vActivation * (0.3 + fresnel * 0.7);
      
      // Decay flicker
      float flicker = 0.95 + sin(time * 2.0 + vPosition.x * 10.0) * 0.05;
      emissive *= flicker;
      
      vec3 color = baseColor * emissive;
      float alpha = 0.3 + emissive * 0.7;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ NeuronMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    neuronMaterial: React.JSX.IntrinsicElements["shaderMaterial"] & {
      time?: number;
      baseColor?: THREE.Color;
    };
  }
}

// ─── Shader Material for Edges ────────────────────────────────────────

const EdgeMaterial = shaderMaterial(
  {
    time: 0,
    baseColor: new THREE.Color(0x00c8dc),
  },
  /*glsl*/ `
    varying vec2 vUv;
    varying float vSignalTime;
    
    attribute float signalTime;
    
    void main() {
      vUv = uv;
      vSignalTime = signalTime;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /*glsl*/ `
    uniform float time;
    uniform vec3 baseColor;
    
    varying vec2 vUv;
    varying float vSignalTime;
    
    void main() {
      float pulseWidth = 0.15;
      float pulseSpeed = 2.0;
      
      // Traveling pulse along edge
      float elapsed = time - vSignalTime;
      float pulsePos = mod(elapsed * pulseSpeed, 1.0 + pulseWidth);
      float dist = abs(vUv.x - pulsePos);
      
      float pulse = smoothstep(pulseWidth, 0.0, dist);
      
      // Base edge color (very dim)
      vec3 color = baseColor * 0.1;
      
      // Add pulse
      color += baseColor * pulse * 2.0;
      
      float alpha = 0.2 + pulse * 0.8;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ EdgeMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    edgeMaterial: React.JSX.IntrinsicElements["shaderMaterial"] & {
      time?: number;
      baseColor?: THREE.Color;
    };
  }
}

// ─── Neural Network Generator ──────────────────────────────────────────

function generateNeuralNetwork(nodeCount: number = 500): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  const regions = ["cortex", "cerebellum", "brainstem", "limbic"];
  const colors: Record<string, [number, number, number]> = {
    cortex: [0, 200, 220],
    cerebellum: [100, 180, 255],
    brainstem: [150, 220, 255],
    limbic: [200, 240, 255],
  };
  
  // Generate nodes in 3D space with clustering
  for (let i = 0; i < nodeCount; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    const cluster = Math.floor(Math.random() * 4);
    
    // Create clusters
    const clusterCenter = [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 20,
    ];
    
    const position: [number, number, number] = [
      clusterCenter[0] + (Math.random() - 0.5) * 8,
      clusterCenter[1] + (Math.random() - 0.5) * 6,
      clusterCenter[2] + (Math.random() - 0.5) * 8,
    ];
    
    nodes.push({
      id: i,
      position,
      region,
      baseColor: colors[region],
      activationLevel: 0,
      lastActivation: -Infinity,
    });
  }
  
  // Generate edges (sparse connections)
  const edgeCount = Math.floor(nodeCount * 2.5);
  for (let i = 0; i < edgeCount; i++) {
    const source = Math.floor(Math.random() * nodeCount);
    let target = Math.floor(Math.random() * nodeCount);
    
    // Prefer nearby connections
    if (Math.random() > 0.3) {
      const sourceNode = nodes[source];
      let bestDist = Infinity;
      for (let j = 0; j < 10; j++) {
        const candidate = Math.floor(Math.random() * nodeCount);
        if (candidate === source) continue;
        const dist = Math.sqrt(
          Math.pow(nodes[candidate].position[0] - sourceNode.position[0], 2) +
          Math.pow(nodes[candidate].position[1] - sourceNode.position[1], 2) +
          Math.pow(nodes[candidate].position[2] - sourceNode.position[2], 2)
        );
        if (dist < bestDist) {
          bestDist = dist;
          target = candidate;
        }
      }
    }
    
    if (source !== target) {
      edges.push({
        sourceId: source,
        targetId: target,
        weight: 0.5 + Math.random() * 0.5,
        lastSignalTime: -Infinity,
      });
    }
  }
  
  return { nodes, edges };
}

// ─── Neuron Instances Component ───────────────────────────────────────

function NeuronInstances({ nodes, time }: { nodes: Node[]; time: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.15, 1), []);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const activationRef = useRef<Float32Array>(new Float32Array(nodes.length));
  
  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return;
    
    nodes.forEach((node, i) => {
      dummy.position.set(...node.position);
      dummy.scale.setScalar(0.8 + node.activationLevel * 0.4);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      activationRef.current[i] = node.activationLevel;
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Update activation attribute
    const attr = meshRef.current.geometry.getAttribute("activationLevel") as THREE.InstancedBufferAttribute;
    if (attr) {
      attr.needsUpdate = true;
    }
    
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = time;
    }
  });
  
  // Initialize activation attribute
  useEffect(() => {
    if (!meshRef.current) return;
    
    const activationArray = new Float32Array(nodes.length);
    nodes.forEach((node, i) => {
      activationArray[i] = node.activationLevel;
    });
    
    const attribute = new THREE.InstancedBufferAttribute(activationArray, 1);
    meshRef.current.geometry.setAttribute("activationLevel", attribute);
  }, [nodes.length]);
  
  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, nodes.length]} frustumCulled={false}>
      <neuronMaterial
        ref={materialRef}
        time={time}
        baseColor={new THREE.Color(0x00c8dc)}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

// ─── Edge Lines Component ─────────────────────────────────────────────

function EdgeLines({ edges, nodes, time }: { edges: Edge[]; nodes: Node[]; time: number }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const geometry = useMemo(() => {
    const posArray: number[] = [];
    const sigArray: number[] = [];
    
    edges.forEach((edge) => {
      const source = nodes[edge.sourceId];
      const target = nodes[edge.targetId];
      
      if (source && target) {
        posArray.push(...source.position, ...target.position);
        sigArray.push(edge.lastSignalTime, edge.lastSignalTime);
      }
    });
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(posArray), 3));
    geo.setAttribute("signalTime", new THREE.BufferAttribute(new Float32Array(sigArray), 1));
    return geo;
  }, [edges.length, nodes.length]);
  
  useFrame(() => {
    if (!lineRef.current || !materialRef.current) return;
    
    // Update signal times
    const sigAttr = lineRef.current.geometry.getAttribute("signalTime") as THREE.BufferAttribute;
    if (sigAttr) {
      let idx = 0;
      edges.forEach((edge) => {
        sigAttr.array[idx] = edge.lastSignalTime;
        sigAttr.array[idx + 1] = edge.lastSignalTime;
        idx += 2;
      });
      sigAttr.needsUpdate = true;
    }
    
    materialRef.current.uniforms.time.value = time;
  });
  
  return (
    <lineSegments ref={lineRef} geometry={geometry} frustumCulled={false}>
      <edgeMaterial
        ref={materialRef}
        time={time}
        baseColor={new THREE.Color(0x00c8dc)}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// ─── Activity Engine ───────────────────────────────────────────────────

function useNeuralActivity(nodes: Node[], edges: Edge[]) {
  const [time, setTime] = useState(0);
  const lastRandomActivation = useRef(0);
  
  useFrame((_, delta) => {
    const now = Date.now();
    const timeSeconds = now / 1000;
    setTime(timeSeconds);
    
    // Decay activation
    nodes.forEach((node) => {
      node.activationLevel *= Math.exp(-delta * 2.5);
      if (node.activationLevel < 0.01) node.activationLevel = 0;
    });
    
    // Random activations (every ~2 seconds)
    if (timeSeconds - lastRandomActivation.current > 2.0) {
      lastRandomActivation.current = timeSeconds;
      
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      randomNode.activationLevel = 0.6 + Math.random() * 0.4;
      randomNode.lastActivation = now;
      
      // Propagate to connected nodes
      edges.forEach((edge) => {
        if (edge.sourceId === randomNode.id) {
          const target = nodes[edge.targetId];
          if (target) {
            target.activationLevel = Math.min(1, target.activationLevel + edge.weight * 0.35);
            edge.lastSignalTime = timeSeconds;
          }
        }
      });
    }
    
    // Cascade activations
    nodes.forEach((node) => {
      if (node.activationLevel > 0.65) {
        edges.forEach((edge) => {
          if (edge.sourceId === node.id && Math.random() < 0.25) {
            const target = nodes[edge.targetId];
            if (target && target.activationLevel < 0.6) {
              target.activationLevel = Math.min(1, target.activationLevel + edge.weight * 0.4);
              edge.lastSignalTime = timeSeconds;
            }
          }
        });
      }
    });
  });
  
  return time;
}

// ─── Main Scene Component ──────────────────────────────────────────────

function NeuralScene() {
  const { nodes, edges } = useMemo(() => generateNeuralNetwork(500), []);
  const time = useNeuralActivity(nodes, edges);
  
  return (
    <>
      <NeuronInstances nodes={nodes} time={time} />
      <EdgeLines edges={edges} nodes={nodes} time={time} />
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────

export default function NeuralActivityRenderer() {
  return (
    <HudFrame variant="asymmetric" className="w-full h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="w-full h-full"
      >
        <color attach="background" args={["#030406"]} />
        <fog attach="fog" args={["#030406", 15, 45]} />
        <ambientLight intensity={0.05} />
        
        <NeuralScene />
        
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.6}
            luminanceThreshold={0.06}
            luminanceSmoothing={0.85}
            mipmapBlur
            radius={0.9}
          />
          <Vignette
            offset={0.25}
            darkness={0.65}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>
    </HudFrame>
  );
}
