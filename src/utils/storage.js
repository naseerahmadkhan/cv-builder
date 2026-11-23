const STORAGE_KEY = 'cv-builder';

export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load CV from localStorage:', e);
  }
  return null;
}

export function saveToStorage(cv) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
  } catch (e) {
    console.warn('Failed to save CV to localStorage:', e);
  }
}

export function downloadJson(cv) {
  const blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${(cv.header.name || 'cv').replace(/\s+/g, '_')}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}