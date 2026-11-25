import { useEffect, useState } from 'react';
import { DEFAULT_CV } from '../data/defaultCV.js';
import {
  createItem,
  createWorkspace,
  getIn,
  loadLegacyCV,
  loadWorkspace,
  mergeWithDefaults,
  nextCvName,
  normalizeWorkspace,
  saveWorkspace,
  setIn,
} from '../utils';

/**
 * Start from the saved tabs; otherwise move an old single-CV save into the
 * first tab; otherwise start with the default CV.
 */
function getInitialWorkspace() {
  const saved = normalizeWorkspace(loadWorkspace());
  if (saved) return saved;

  const legacy = loadLegacyCV();
  return createWorkspace(legacy ? mergeWithDefaults(legacy) : DEFAULT_CV);
}

/**
 * Owns all CV state: the list of CV tabs, which one is active, auto-saving,
 * and the edit helpers for the active CV.
 *
 * Edit paths are arrays that walk into the CV object, for example
 * `['experience', 0, 'title']` or `['header', 'name']`.
 *
 * @returns {{
 *   cv: object,
 *   actions: object,
 *   tabs: Array<{id: string, name: string}>,
 *   activeId: string,
 *   tabActions: object,
 * }}
 */
export function useWorkspace() {
  const [workspace, setWorkspace] = useState(getInitialWorkspace);

  // Persist every change so a refresh never loses work.
  useEffect(() => {
    saveWorkspace(workspace);
  }, [workspace]);

  const { items, activeId } = workspace;
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  /** Replace the active CV with `update(currentCV)`. */
  const updateActiveCV = (update) =>
    setWorkspace((previous) => ({
      ...previous,
      items: previous.items.map((item) =>
        item.id === previous.activeId ? { ...item, cv: update(item.cv) } : item,
      ),
    }));

  /** Run `mutate` on a deep copy of the active CV and store the result. */
  const edit = (mutate) =>
    updateActiveCV((cv) => {
      const draft = structuredClone(cv);
      mutate(draft);
      return draft;
    });

  /** Edit helpers for the active CV. */
  const actions = {
    /** Set one value, e.g. setValue(['header', 'name'], 'Jane'). */
    setValue: (path, value) => edit((draft) => setIn(draft, path, value)),

    /** Shortcut for style properties. */
    setStyle: (key, value) => edit((draft) => setIn(draft, ['style', key], value)),

    /** Append an item to the list found at `path`. */
    addItem: (path, item) => edit((draft) => getIn(draft, path).push(item)),

    /** Remove the item at `index` from the list found at `path`. */
    removeItem: (path, index) => edit((draft) => getIn(draft, path).splice(index, 1)),

    /** Delete a key from the object found at `path` (used for section icons). */
    removeKey: (path, key) => edit((draft) => delete getIn(draft, path)[key]),

    /** Replace the active CV with imported data, filling in missing keys. */
    load: (data) => updateActiveCV(() => mergeWithDefaults(data)),

    /** Put the active CV back to the built-in default. */
    reset: () => updateActiveCV(() => structuredClone(DEFAULT_CV)),
  };

  /** Tab helpers. */
  const tabActions = {
    select: (id) => setWorkspace((previous) => ({ ...previous, activeId: id })),

    /** New tab with the default CV, selected right away. */
    add: () =>
      setWorkspace((previous) => {
        const item = createItem(nextCvName(previous.items));
        return { activeId: item.id, items: [...previous.items, item] };
      }),

    /** Copy a tab (placed right after it) and select the copy. */
    duplicate: (id) =>
      setWorkspace((previous) => {
        const index = previous.items.findIndex((item) => item.id === id);
        if (index === -1) return previous;
        const source = previous.items[index];
        const copy = createItem(nextCvName(previous.items), source.cv);
        const items = [...previous.items];
        items.splice(index + 1, 0, { ...copy, name: `${source.name} copy` });
        return { activeId: copy.id, items };
      }),

    rename: (id, name) =>
      setWorkspace((previous) => ({
        ...previous,
        items: previous.items.map((item) => (item.id === id ? { ...item, name } : item)),
      })),

    /** Delete a tab. The last remaining tab cannot be deleted. */
    remove: (id) =>
      setWorkspace((previous) => {
        if (previous.items.length <= 1) return previous;
        const index = previous.items.findIndex((item) => item.id === id);
        if (index === -1) return previous;

        const items = previous.items.filter((item) => item.id !== id);
        // If the open tab was deleted, fall back to its neighbour.
        const activeId =
          previous.activeId === id ? (items[index - 1] ?? items[index]).id : previous.activeId;
        return { activeId, items };
      }),
  };

  return {
    cv: activeItem.cv,
    actions,
    tabs: items.map(({ id, name }) => ({ id, name })),
    activeId: activeItem.id,
    tabActions,
  };
}
