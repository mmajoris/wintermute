"use client";

import React from "react";
import NeuralActivityRenderer from "./NeuralActivityRenderer";

export default function DataDisplayExamples() {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-[10px] uppercase tracking-wide mb-4" style={{ color: "rgba(0, 200, 220, 0.4)" }}>
          Neural Activity Renderer
        </div>
        <NeuralActivityRenderer />
      </div>
    </div>
  );
}
