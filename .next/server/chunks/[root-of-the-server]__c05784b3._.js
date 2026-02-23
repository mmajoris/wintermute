module.exports = [
"[project]/.next-internal/server/app/api/brain-events/stream/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/lib/event-buffer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Circular Event Buffer
 * 
 * In-memory buffer for storing recent brain events.
 * Used by the API endpoint to store events and by WebSocket to send history.
 */ __turbopack_context__.s([
    "EventBuffer",
    ()=>EventBuffer,
    "getGlobalEventBuffer",
    ()=>getGlobalEventBuffer
]);
class EventBuffer {
    buffer = [];
    maxSize;
    eventCounter = 0;
    constructor(maxSize = 1000){
        this.maxSize = maxSize;
    }
    push(event) {
        const envelope = {
            id: `evt_${Date.now()}_${++this.eventCounter}`,
            event,
            received_at: new Date().toISOString()
        };
        this.buffer.push(envelope);
        if (this.buffer.length > this.maxSize) {
            this.buffer.shift();
        }
        return envelope;
    }
    getRecent(count = 100) {
        return this.buffer.slice(-count);
    }
    getAll() {
        return [
            ...this.buffer
        ];
    }
    getByType(type, count = 50) {
        return this.buffer.filter((e)=>e.event.type === type).slice(-count);
    }
    getSince(timestamp) {
        const since = new Date(timestamp).getTime();
        return this.buffer.filter((e)=>new Date(e.received_at).getTime() > since);
    }
    clear() {
        this.buffer = [];
    }
    get size() {
        return this.buffer.length;
    }
    get eventsPerSecond() {
        if (this.buffer.length < 2) return 0;
        const recent = this.buffer.slice(-100);
        if (recent.length < 2) return 0;
        const first = new Date(recent[0].received_at).getTime();
        const last = new Date(recent[recent.length - 1].received_at).getTime();
        const durationSeconds = (last - first) / 1000;
        if (durationSeconds <= 0) return 0;
        return recent.length / durationSeconds;
    }
}
let globalBuffer = null;
function getGlobalEventBuffer() {
    if (!globalBuffer) {
        globalBuffer = new EventBuffer(1000);
    }
    return globalBuffer;
}
}),
"[project]/lib/sse-clients.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * SSE Client Manager
 * 
 * Manages Server-Sent Events clients for broadcasting brain events.
 */ __turbopack_context__.s([
    "addSSEClient",
    ()=>addSSEClient,
    "broadcastToSSEClients",
    ()=>broadcastToSSEClients,
    "getSSEClientCount",
    ()=>getSSEClientCount,
    "removeSSEClient",
    ()=>removeSSEClient
]);
const clients = new Map();
let clientCounter = 0;
function addSSEClient(controller, encoder) {
    const id = `sse_${Date.now()}_${++clientCounter}`;
    clients.set(id, {
        id,
        controller,
        encoder
    });
    return id;
}
function removeSSEClient(id) {
    clients.delete(id);
}
function broadcastToSSEClients(envelope) {
    const message = `data: ${JSON.stringify({
        type: "brain_event",
        data: envelope
    })}\n\n`;
    const deadClients = [];
    for (const [id, client] of clients){
        try {
            client.controller.enqueue(client.encoder.encode(message));
        } catch  {
            deadClients.push(id);
        }
    }
    for (const id of deadClients){
        clients.delete(id);
    }
}
function getSSEClientCount() {
    return clients.size;
}
}),
"[project]/app/api/brain-events/stream/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$event$2d$buffer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/event-buffer.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sse$2d$clients$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sse-clients.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
async function GET(request) {
    const buffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$event$2d$buffer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGlobalEventBuffer"])();
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start (controller) {
            const clientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sse$2d$clients$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addSSEClient"])(controller, encoder);
            const history = buffer.getRecent(100);
            const historyMessage = `data: ${JSON.stringify({
                type: "history",
                data: history
            })}\n\n`;
            controller.enqueue(encoder.encode(historyMessage));
            const keepalive = setInterval(()=>{
                try {
                    controller.enqueue(encoder.encode(`: keepalive\n\n`));
                } catch  {
                    clearInterval(keepalive);
                }
            }, 30000);
            request.signal.addEventListener("abort", ()=>{
                clearInterval(keepalive);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sse$2d$clients$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["removeSSEClient"])(clientId);
                try {
                    controller.close();
                } catch  {
                // Already closed
                }
            });
        },
        cancel () {
        // Client disconnected
        }
    });
    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c05784b3._.js.map