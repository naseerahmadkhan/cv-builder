import { useRef, useState } from 'react';
import { MESSAGES, TABS } from '../../constants';

/** Small outline icon used by the tab buttons. */
function TabIcon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const ICON_RENAME = <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />;
const ICON_DUPLICATE = (
  <>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </>
);
const ICON_CLOSE = <path d="M18 6 6 18M6 6l12 12" />;

/**
 * Tab bar above the preview: one tab per CV.
 * Click a tab to open it, double-click (or use the pencil on the right) to rename it.
 *
 * @param {Array<{id: string, name: string}>} tabs
 * @param {string} activeId
 * @param {object} actions - { select, add, rename, duplicate, remove } from useWorkspace
 */
export function CVTabs({ tabs, activeId, actions }) {
  const [editingId, setEditingId] = useState(null);
  const [draftName, setDraftName] = useState('');
  // Set when Escape is pressed so the blur that follows does not save the draft.
  const cancelRename = useRef(false);

  const startRename = (tab) => {
    cancelRename.current = false;
    setDraftName(tab.name);
    setEditingId(tab.id);
  };

  const finishRename = (tab) => {
    const name = draftName.trim();
    if (!cancelRename.current && name) actions.rename(tab.id, name);
    setEditingId(null);
  };

  const handleRenameKey = (event) => {
    if (event.key === 'Enter') event.currentTarget.blur();
    if (event.key === 'Escape') {
      cancelRename.current = true;
      event.currentTarget.blur();
    }
  };

  const activeTab = tabs.find((tab) => tab.id === activeId);

  const handleRemove = (tab) => {
    if (confirm(MESSAGES.confirmDeleteCV(tab.name))) actions.remove(tab.id);
  };

  return (
    <div className="cvb-tabs" role="tablist" aria-label="CVs">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        if (tab.id === editingId) {
          return (
            <input
              key={tab.id}
              className="cvb-tab-input"
              value={draftName}
              maxLength={TABS.maxNameLength}
              autoFocus
              onFocus={(event) => event.target.select()}
              onChange={(event) => setDraftName(event.target.value)}
              onBlur={() => finishRename(tab)}
              onKeyDown={handleRenameKey}
              aria-label="CV name"
            />
          );
        }

        return (
          <div key={tab.id} className={`cvb-tab${isActive ? ' cvb-tab--active' : ''}`}>
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              className="cvb-tab-label"
              title="Double-click to rename"
              onClick={() => actions.select(tab.id)}
              onDoubleClick={() => startRename(tab)}
            >
              {tab.name}
            </button>

          </div>
        );
      })}

      <button type="button" className="cvb-tab-add" title="New CV" aria-label="New CV" onClick={actions.add}>
        +
      </button>

      {/* Actions for the open CV. Kept in a fixed spot so clicking a tab never shifts the layout. */}
      {activeTab && (
        <div className="cvb-tab-actions">
          <button
            type="button"
            className="cvb-tab-btn"
            title="Rename"
            aria-label={`Rename ${activeTab.name}`}
            onClick={() => startRename(activeTab)}
          >
            <TabIcon>{ICON_RENAME}</TabIcon>
          </button>
          <button
            type="button"
            className="cvb-tab-btn"
            title="Duplicate"
            aria-label={`Duplicate ${activeTab.name}`}
            onClick={() => actions.duplicate(activeTab.id)}
          >
            <TabIcon>{ICON_DUPLICATE}</TabIcon>
          </button>
          {tabs.length > 1 && (
            <button
              type="button"
              className="cvb-tab-btn"
              title="Delete"
              aria-label={`Delete ${activeTab.name}`}
              onClick={() => handleRemove(activeTab)}
            >
              <TabIcon>{ICON_CLOSE}</TabIcon>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
