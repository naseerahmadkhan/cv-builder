const btnSm = {
  padding: '3px 8px',
  fontSize: 12,
  border: '1px solid #b9c1ce',
  borderRadius: 6,
  background: '#fff',
  font: '13px system-ui, sans-serif',
  cursor: 'pointer',
};

export function Card({ children, onRemove }) {
  return (
    <div style={{ border: '1px solid #e3e7ed', borderRadius: 8, padding: '4px 10px 10px', margin: '8px 0', background: '#fafbfc' }}>
      {children}
      <button style={{ ...btnSm, marginTop: 8 }} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}