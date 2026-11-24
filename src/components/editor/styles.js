/**
 * Shared inline styles for the editor controls.
 * Built from the UI constants so colors, fonts and radii are defined once.
 */
import { UI, UI_FONT, UI_RADIUS } from '../../constants';

/** Small caption above a control. */
export const labelStyle = {
  display: 'block',
  fontFamily: 'system-ui, sans-serif',
  fontSize: 12,
  color: UI.labelColor,
  margin: '8px 0 3px',
};

/** Text input, textarea and select share the same box. */
export const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '6px 8px',
  border: `1px solid ${UI.border}`,
  borderRadius: UI_RADIUS.control,
  font: UI_FONT.body,
  background: UI.bg,
};

/** Select that only takes the width of its content. */
export const inlineSelectStyle = { ...inputStyle, width: 'auto' };

export const buttonStyle = {
  padding: '7px 12px',
  border: `1px solid ${UI.borderDark}`,
  borderRadius: UI_RADIUS.control,
  background: UI.bg,
  font: UI_FONT.body,
  cursor: 'pointer',
};

export const primaryButtonStyle = {
  ...buttonStyle,
  background: UI.primaryBg,
  color: UI.primaryText,
  borderColor: UI.primaryBg,
};

export const smallButtonStyle = { ...buttonStyle, padding: '3px 8px', fontSize: 12 };

/** Horizontal group of controls. */
export const rowStyle = { display: 'flex', gap: 8 };

/** Label that wraps a checkbox or inline select. */
export const inlineLabelStyle = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  marginTop: 10,
  font: UI_FONT.body,
};
