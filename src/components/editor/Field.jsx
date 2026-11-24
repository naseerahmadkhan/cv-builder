import { UI } from '../../data/constants.js';

const lbl = {
  display: 'block',
  fontFamily: 'system-ui, sans-serif',
  fontSize: 12,
  color: UI.labelColor,
  margin: '8px 0 3px',
};

const inp = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '6px 8px',
  border: `1px solid ${UI.border}`,
  borderRadius: 6,
  font: '13px system-ui, sans-serif',
  background: UI.bg,
};

export function Field({ label, value, onChange, area, rows = 3 }) {
  return (
    <label>
      <span style={lbl}>{label}</span>
      {area ? (
        <textarea
          style={{ ...inp, resize: 'vertical' }}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          style={inp}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}