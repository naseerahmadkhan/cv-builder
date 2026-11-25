import { LEGACY_STORAGE_KEY, STORAGE_KEY } from '../constants';

/** Parse JSON from localStorage; null when missing or unreadable. */
function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.warn(`Failed to read "${key}" from localStorage:`, error);
  }
  return null;
}

/** Read the auto-saved workspace (all CV tabs), or null if there is none. */
export function loadWorkspace() {
  return readJson(STORAGE_KEY);
}

/**
 * Read the CV saved by the old single-CV version of the app, so it can be
 * moved into the first tab. Returns null if there is none.
 */
export function loadLegacyCV() {
  return readJson(LEGACY_STORAGE_KEY);
}

/** Auto-save the workspace (failures are logged, never thrown). */
export function saveWorkspace(workspace) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
  } catch (error) {
    console.warn('Failed to save CVs to localStorage:', error);
  }
}
