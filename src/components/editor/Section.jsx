import { UI, UI_FONT } from '../../constants';

/** Collapsible group of controls in the sidebar. */
export function Section({ title, children, open = true }) {
  return (
    <details open={open} style={{ borderBottom: `1px solid ${UI.divider}`, padding: '10px 0' }}>
      <summary style={{ cursor: 'pointer', font: UI_FONT.heading }}>{title}</summary>
      <div style={{ paddingTop: 6 }}>{children}</div>
    </details>
  );
}
