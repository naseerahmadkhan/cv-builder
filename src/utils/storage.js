/**
 * Read the auto-saved state from localStorage.
 * @param {string} key - Storage key
 * @returns {object|null} The saved state, or null if nothing valid is stored.
 */
export function loadFromStorage(key = 'cv-builder') {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
  }
  return null;
}

/** Auto-save the state to localStorage (failures are logged, never thrown). */
export function saveToStorage(state, key = 'cv-builder') {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}
