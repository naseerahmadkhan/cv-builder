import { UI } from '../../data/constants.js';

const btnSm = {
  padding: '3px 8px',
  fontSize: 12,
  border: `1px solid ${UI.borderDark}`,
  borderRadius: 6,
  background: UI.bg,
  font: '13px system-ui, sans-serif',
  cursor: 'pointer',
};

export function Card({ children, onRemove }) {
  return (
    <div style={{ border: `1px solid ${UI.divider}`, borderRadius: 8, padding: '4px 10px 10px', margin: '8px 0', background: UI.bgPanel }}>
      {children}
      <button style={{ ...btnSm, marginTop: 8 }} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}