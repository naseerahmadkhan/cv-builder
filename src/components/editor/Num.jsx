const lbl = {
  display: 'block',
  fontFamily: 'system-ui, sans-serif',
  fontSize: 12,
  color: '#5b6472',
  margin: '8px 0 3px',
};

const inp = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '6px 8px',
  border: '1px solid #cfd5de',
  borderRadius: 6,
  font: '13px system-ui, sans-serif',
  background: '#fff',
};

export function Num({ label, value, onChange, min = 6, max = 60 }) {
  return (
    <label style={{ flex: 1 }}>
      <span style={lbl}>{label}</span>
      <input
        style={inp}
        type="number"
        min={min}
        max={max}
        step="0.5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || min)}
      />
    </label>
  );
}