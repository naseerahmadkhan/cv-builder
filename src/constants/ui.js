/**
 * Look and feel of the editor sidebar (NOT the CV theme, see style.js).
 */
import { DEFAULT_STYLE } from './style.js';

export const UI = {
  border: '#cfd5de',
  borderDark: '#b9c1ce',
  labelColor: '#5b6472',
  helperText: '#6b7482',
  bg: '#fff',
  bgPanel: '#fafbfc',
  bgHover: '#f0f2f5',
  divider: '#e3e7ed',
  // Primary button follows the CV header color so the app feels consistent.
  primaryBg: DEFAULT_STYLE.headerBg,
  primaryText: '#fff',
};

/** Shorthand `font` values used by editor controls. */
const UI_FONT_FAMILY = 'system-ui, sans-serif';
export const UI_FONT = {
  body: `13px ${UI_FONT_FAMILY}`,
  small: `12px ${UI_FONT_FAMILY}`,
  heading: `600 14px ${UI_FONT_FAMILY}`,
};

/** Corner radii (px). */
export const UI_RADIUS = { control: 6, card: 8, swatch: 4 };

/** Size of the color preset swatches and the main color input (px). */
export const SWATCH_SIZE = 20;
export const COLOR_INPUT_HEIGHT = 32;
