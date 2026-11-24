import { EXPORT } from '../constants';

/** Download the CV as a .json file named after the CV owner. */
export function downloadJson(cv) {
  const blob = new Blob([JSON.stringify(cv, null, EXPORT.jsonIndent)], { type: EXPORT.mimeType });
  const baseName = (cv.header.name || EXPORT.fallbackName).replace(/\s+/g, '_');

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${baseName}${EXPORT.extension}`;
  link.click();
  URL.revokeObjectURL(link.href);
}

/** Read a File object as text. */
export function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
