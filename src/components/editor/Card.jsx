import { UI, UI_RADIUS } from '../../constants';
import { Button } from './Button.jsx';

/** Boxed group of fields for one list item, with a Remove button. */
export function Card({ children, onRemove }) {
  return (
    <div
      style={{
        border: `1px solid ${UI.divider}`,
        borderRadius: UI_RADIUS.card,
        padding: '4px 10px 10px',
        margin: '8px 0',
        background: UI.bgPanel,
      }}
    >
      {children}
      <Button variant="small" style={{ marginTop: 8 }} onClick={onRemove}>
        Remove
      </Button>
    </div>
  );
}
