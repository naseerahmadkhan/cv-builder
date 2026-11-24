import { useEffect, useState } from 'react';
import { DEFAULT_CV } from '../data/defaultCV.js';
import { getIn, loadFromStorage, mergeWithDefaults, saveToStorage, setIn } from '../utils';

/** Start from the auto-saved CV if there is one, otherwise from the defaults. */
function getInitialCV() {
  const stored = loadFromStorage();
  return stored ? mergeWithDefaults(stored) : DEFAULT_CV;
}

/**
 * Owns the CV state: loads it, auto-saves it and exposes small edit helpers.
 *
 * Paths are arrays that walk into the CV object, for example
 * `['experience', 0, 'title']` or `['header', 'name']`.
 *
 * @returns {{ cv: object, actions: object }}
 */
export function useCV() {
  const [cv, setCv] = useState(getInitialCV);

  // Persist every change so a refresh never loses work.
  useEffect(() => {
    saveToStorage(cv);
  }, [cv]);

  /** Run `mutate` on a deep copy of the CV and store the result. */
  const edit = (mutate) =>
    setCv((previous) => {
      const draft = structuredClone(previous);
      mutate(draft);
      return draft;
    });

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

    /** Replace the whole CV with imported data, filling in missing keys. */
    load: (data) => setCv(mergeWithDefaults(data)),

    /** Go back to the built-in default CV. */
    reset: () => setCv(DEFAULT_CV),
  };

  return { cv, actions };
}
