import Redis from "ioredis";

// ── Types ──────────────────────────────────────────────────────────────────

export type CommandType = "sleep" | "wake";

export interface QueuedCommand {
  id: string;
  command: CommandType;
  params?: Record<string, string>;
  created_at: string;
}

export interface VMStatus {
  molly_active: string;
  docker: string;
  timestamp: string;
}

// ── Redis Client ───────────────────────────────────────────────────────────

const KEYS = {
  vmStatus: "molly:status",
  commandQueue: "molly:commands",
} as const;

const STATUS_TTL_SECONDS = 300;
const COMMAND_TTL_SECONDS = 600;

let redis: Redis | null = null;

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL!, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
  }
  return redis;
}

// ── VM Status ──────────────────────────────────────────────────────────────

export async function setVMStatus(status: VMStatus): Promise<void> {
  await getRedis().set(
    KEYS.vmStatus,
    JSON.stringify(status),
    "EX",
    STATUS_TTL_SECONDS,
  );
}

export async function getVMStatus(): Promise<VMStatus | null> {
  const raw = await getRedis().get(KEYS.vmStatus);
  if (!raw) return null;
  return JSON.parse(raw) as VMStatus;
}

// ── Command Queue ──────────────────────────────────────────────────────────

export async function enqueueCommand(
  command: CommandType,
  params?: Record<string, string>,
): Promise<QueuedCommand> {
  const entry: QueuedCommand = {
    id: `cmd_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    command,
    params,
    created_at: new Date().toISOString(),
  };
  const r = getRedis();
  await r.lpush(KEYS.commandQueue, JSON.stringify(entry));
  await r.expire(KEYS.commandQueue, COMMAND_TTL_SECONDS);
  return entry;
}

/**
 * Atomically drains all pending commands — returns them and removes them from
 * the queue. Safe under concurrent access: a command is returned to exactly
 * one caller.
 */
export async function drainCommands(): Promise<QueuedCommand[]> {
  const r = getRedis();

  const len = await r.llen(KEYS.commandQueue);
  if (len === 0) return [];

  const results = await r
    .multi()
    .lrange(KEYS.commandQueue, 0, -1)
    .del(KEYS.commandQueue)
    .exec();

  if (!results) return [];

  const [lrangeResult] = results;
  if (!lrangeResult || lrangeResult[0]) return [];

  const rawList = lrangeResult[1] as string[];
  return rawList.map((s) => JSON.parse(s) as QueuedCommand);
}
