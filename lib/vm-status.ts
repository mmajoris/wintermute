export interface VMStatus {
  molly_active: string;
  docker: string;
  timestamp: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __vmStatus: VMStatus | null | undefined;
}

export function getGlobalVMStatus(): VMStatus | null {
  return globalThis.__vmStatus ?? null;
}

export function setGlobalVMStatus(status: VMStatus): void {
  globalThis.__vmStatus = status;
}
