import { useEffect, useState } from 'react';
import { DEFAULT_CV } from '../data/defaultCV.js';
import { getIn, loadFromStorage, mergeWithDefaults, saveToStorage, setIn } from '../utils';

/** Create a new CV tab with default content. */
function createNewCV(name = 'New CV') {
  return {
    id: crypto.randomUUID(),
    name,
    cv: { ...DEFAULT_CV },
  };
}

/** Get initial state from localStorage or create first CV. */
function getInitialState() {
  const stored = loadFromStorage('cv-builder-multi');
  if (stored?.tabs?.length) {
    return {
      tabs: stored.tabs.map((t) => ({ ...t, cv: mergeWithDefaults(t.cv) })),
      activeIndex: Math.min(stored.activeIndex ?? 0, stored.tabs.length - 1),
    };
  }
  return {
    tabs: [createNewCV('CV 1')],
    activeIndex: 0,
  };
}

export function useCV() {
  const [state, setState] = useState(getInitialState);

  const { tabs, activeIndex } = state;
  const activeTab = tabs[activeIndex];
  const cv = activeTab?.cv ?? DEFAULT_CV;

  useEffect(() => {
    saveToStorage(state, 'cv-builder-multi');
  }, [state]);

  const edit = (mutate) =>
    setState((previous) => {
      const draft = structuredClone(previous);
      mutate(draft);
      return draft;
    });

  const editActiveCV = (mutate) =>
    edit((draft) => {
      if (draft.tabs[draft.activeIndex]) {
        mutate(draft.tabs[draft.activeIndex].cv);
      }
    });

  const actions = {
    setValue: (path, value) => editActiveCV((draft) => setIn(draft, path, value)),
    setStyle: (key, value) => editActiveCV((draft) => setIn(draft, ['style', key], value)),
    addItem: (path, item) => editActiveCV((draft) => getIn(draft, path).push(item)),
    removeItem: (path, index) => editActiveCV((draft) => getIn(draft, path).splice(index, 1)),
    removeKey: (path, key) => editActiveCV((draft) => delete getIn(draft, path)[key]),
    load: (data) => editActiveCV((draft) => Object.assign(draft, mergeWithDefaults(data))),
    reset: () => editActiveCV((draft) => Object.assign(draft, DEFAULT_CV)),

    // Tab management
    addTab: (name) =>
      edit((draft) => {
        const newTab = createNewCV(name);
        draft.tabs.push(newTab);
        draft.activeIndex = draft.tabs.length - 1;
      }),
    removeTab: (index) =>
      edit((draft) => {
        if (draft.tabs.length <= 1) return;
        draft.tabs.splice(index, 1);
        if (draft.activeIndex >= draft.tabs.length) {
          draft.activeIndex = draft.tabs.length - 1;
        }
      }),
    renameTab: (index, name) =>
      edit((draft) => {
        if (draft.tabs[index]) draft.tabs[index].name = name;
      }),
    setActiveTab: (index) =>
      edit((draft) => {
        if (index >= 0 && index < draft.tabs.length) draft.activeIndex = index;
      }),
    duplicateTab: (index) =>
      edit((draft) => {
        const tab = draft.tabs[index];
        if (!tab) return;
        const newTab = {
          id: crypto.randomUUID(),
          name: `${tab.name} (copy)`,
          cv: structuredClone(tab.cv),
        };
        draft.tabs.splice(index + 1, 0, newTab);
        draft.activeIndex = index + 1;
      }),
  };

  return {
    cv,
    tabs,
    activeIndex,
    actions,
  };
}