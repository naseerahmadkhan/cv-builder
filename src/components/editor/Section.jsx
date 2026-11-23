export function Section({ title, children, open = true }) {
  return (
    <details open={open} style={{ borderBottom: '1px solid #e3e7ed', padding: '10px 0' }}>
      <summary style={{ cursor: 'pointer', font: '600 14px system-ui, sans-serif' }}>{title}</summary>
      <div style={{ paddingTop: 6 }}>{children}</div>
    </details>
  );
}