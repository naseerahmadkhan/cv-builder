import { STORAGE_KEY } from '../constants';

/**
 * Read the auto-saved CV from localStorage.
 * @returns {object|null} The saved CV, or null if nothing valid is stored.
 */
export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.warn('Failed to load CV from localStorage:', error);
  }
  return null;
}

/** Auto-save the CV to localStorage (failures are logged, never thrown). */
export function saveToStorage(cv) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
  } catch (error) {
    console.warn('Failed to save CV to localStorage:', error);
  }
}
