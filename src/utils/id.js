/** Unique id for a CV tab. Falls back for browsers/contexts without crypto.randomUUID. */
export function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `cv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
