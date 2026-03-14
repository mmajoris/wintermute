export type CommandType = "sleep" | "wake";
export type CommandStatus = "pending" | "acknowledged" | "completed";

export interface QueuedCommand {
  id: string;
  command: CommandType;
  params?: Record<string, string>;
  status: CommandStatus;
  created_at: string;
  acknowledged_at?: string;
}

const MAX_HISTORY = 50;
let commands: QueuedCommand[] = [];
let idCounter = 0;

function generateId(): string {
  return `cmd_${Date.now()}_${++idCounter}`;
}

export function enqueue(
  command: CommandType,
  params?: Record<string, string>
): QueuedCommand {
  const entry: QueuedCommand = {
    id: generateId(),
    command,
    params,
    status: "pending",
    created_at: new Date().toISOString(),
  };
  commands.push(entry);
  if (commands.length > MAX_HISTORY) {
    commands = commands.slice(-MAX_HISTORY);
  }
  return entry;
}

export function getPending(): QueuedCommand[] {
  const pending = commands.filter((c) => c.status === "pending");
  const now = new Date().toISOString();
  for (const cmd of pending) {
    cmd.status = "acknowledged";
    cmd.acknowledged_at = now;
  }
  return pending;
}

export function getAll(): QueuedCommand[] {
  return [...commands];
}

export function clearHistory(): void {
  commands = [];
}

let instance: ReturnType<typeof createCommandQueue> | null = null;

function createCommandQueue() {
  return { enqueue, getPending, getAll, clearHistory };
}

export function getGlobalCommandQueue() {
  if (!instance) instance = createCommandQueue();
  return instance;
}
