import React, { useState } from 'react';

export function TabBar({ tabs = [], activeIndex = 0, onActivate, onRename, onAdd, onDuplicate, onRemove }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingIndex]);

  const handleDoubleClick = (index) => {
    setEditName(tabs[index].name);
    setEditingIndex(index);
  };

  const handleBlur = (index) => {
    if (editingIndex === index && editName.trim()) {
      onRename(index, editName.trim());
    }
    setEditingIndex(null);
    setEditName('');
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      handleBlur(index);
    } else if (e.key === 'Escape') {
      setEditingIndex(null);
      setEditName('');
    }
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    const name = `CV ${tabs.length + 1}`;
    onAdd(name);
  };

  const handleDuplicate = (e, index) => {
    e.stopPropagation();
    onDuplicate(index);
  };

  const handleRemove = (e, index) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    if (confirm(`Delete "${tabs[index].name}"?`)) {
      onRemove(index);
    }
  };

  return (
    <div className="cvb-tabbar" role="tablist" aria-label="CV tabs">
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={`cvb-tab ${index === activeIndex ? 'cvb-tab--active' : ''}`}
          role="tab"
          aria-selected={index === activeIndex}
          aria-controls={`cvb-panel-${tab.id}`}
          id={`cvb-tab-${tab.id}`}
          onClick={() => onActivate(index)}
          onDoubleClick={() => handleDoubleClick(index)}
        >
          {editingIndex === index ? (
            <input
              ref={inputRef}
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => handleBlur(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="cvb-tab__input"
              aria-label="Tab name"
            />
          ) : (
            <span className="cvb-tab__name">{tab.name}</span>
          )}
          <div className="cvb-tab__actions">
            <button
              type="button"
              className="cvb-tab__btn"
              onClick={(e) => handleDuplicate(e, index)}
              title="Duplicate"
              aria-label={`Duplicate ${tab.name}`}
            >
              ⎘
            </button>
            {tabs.length > 1 && (
              <button
                type="button"
                className="cvb-tab__btn"
                onClick={(e) => handleRemove(e, index)}
                title="Delete"
                aria-label={`Delete ${tab.name}`}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="cvb-tab cvb-tab--add"
        onClick={handleAddClick}
        aria-label="Add new CV"
      >
        <span className="cvb-tab__add-icon">+</span>
      </button>
    </div>
  );
}