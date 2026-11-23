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