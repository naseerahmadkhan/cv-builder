const lbl = {
  display: 'block',
  fontFamily: 'system-ui, sans-serif',
  fontSize: 12,
  color: '#5b6472',
  margin: '8px 0 3px',
};

export function Color({ label, value, onChange }) {
  return (
    <label style={{ flex: 1 }}>
      <span style={lbl}>{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          height: 32,
          padding: 2,
          border: '1px solid #cfd5de',
          borderRadius: 6,
          background: '#fff',
        }}
      />
    </label>
  );
}