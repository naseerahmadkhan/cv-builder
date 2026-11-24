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

export function Num({ label, value, onChange, min = 6, max = 60, step = 0.5, style }) {
  return (
    <label style={{ flex: 1, ...style }}>
      <span style={lbl}>{label}</span>
      <input
        style={inp}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || min)}
      />
    </label>
  );
}