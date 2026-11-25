import { TABS } from '../constants';
import { DEFAULT_CV } from '../data/defaultCV.js';
import { mergeWithDefaults } from './cv.js';
import { createId } from './id.js';

/*
 * A "workspace" holds every CV the user is working on:
 *   { activeId: string, items: [{ id, name, cv }] }
 * The CV shown in the editor and preview is the item whose id is `activeId`.
 */

/** First free "CV n" name, so new tabs never share a name. */
export function nextCvName(items) {
  const used = new Set(items.map((item) => item.name));
  let n = items.length + 1;
  while (used.has(`${TABS.defaultNamePrefix} ${n}`)) n++;
  return `${TABS.defaultNamePrefix} ${n}`;
}

/** Build a tab around a CV (the CV is copied so tabs never share data). */
export function createItem(name, cv = DEFAULT_CV) {
  return { id: createId(), name, cv: structuredClone(cv) };
}

/** Workspace with a single tab. */
export function createWorkspace(cv = DEFAULT_CV) {
  const item = createItem(`${TABS.defaultNamePrefix} 1`, cv);
  return { activeId: item.id, items: [item] };
}

/**
 * Repair saved workspace data: fill each CV with defaults, name unnamed tabs
 * and make sure `activeId` points at a real tab.
 *
 * @returns {object|null} A valid workspace, or null if nothing usable was saved.
 */
export function normalizeWorkspace(raw) {
  if (!Array.isArray(raw?.items)) return null;

  const items = raw.items
    .filter((item) => item?.id && item.cv)
    .map((item, index) => ({
      id: item.id,
      name: String(item.name ?? '').trim() || `${TABS.defaultNamePrefix} ${index + 1}`,
      cv: mergeWithDefaults(item.cv),
    }));
  if (items.length === 0) return null;

  const activeId = items.some((item) => item.id === raw.activeId) ? raw.activeId : items[0].id;
  return { activeId, items };
}
