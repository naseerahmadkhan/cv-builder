/**
 * CV theme constants: default style values, font list, color presets and
 * the options offered by the style controls.
 *
 * These values drive both the editor controls and the printed preview,
 * so changing a default here updates the whole app.
 */

/** Key of the layout used when a CV does not specify one. */
export const DEFAULT_LAYOUT_KEY = 'classic';

/** Default style applied to a new CV (and used to fill gaps in older saved files). */
export const DEFAULT_STYLE = {
  // Typography (font sizes are in pt)
  font: "'JetBrains Mono', monospace",
  baseSize: 10,
  nameSize: 28,
  headingSize: 14,

  // Color palette
  headerBg: '#232B38',
  headerText: '#EDEDED',
  accent: '#C8601A',
  textColor: '#111111',
  ruleColor: '#5A6B80',

  // Layout toggles
  pageBreakBeforeProjects: true,
  certificationsLayout: 'vertical',
  certificationsColumns: 2,
  justifyText: true,

  // Spacing (mm)
  pageMarginTop: 16.5,
  headerPaddingTop: 10,
  headerPaddingBottom: 7,
  contentPaddingBottom: 5,
};

/**
 * Built-in font options for the dropdown, as [display name, CSS font-family].
 * Keep in sync with the @font-face rules in styles/cvBuilder.css.
 */
export const FONTS = [
  ['JetBrains Mono', "'JetBrains Mono', monospace"],
  ['Inter', "'Inter', sans-serif"],
  ['Merriweather', "'Merriweather', serif"],
  ['Courier New', "'Courier New', monospace"],
  ['Arial', 'Arial, Helvetica, sans-serif'],
  ['Georgia', 'Georgia, serif'],
  ['Times New Roman', "'Times New Roman', serif"],
];

/** Quick-pick swatches shown under each color input, keyed by style property. */
export const COLOR_PRESETS = {
  headerBg: ['#232B38', '#1a1f2e', '#0d1b2a', '#1b263b', '#16213e'],
  headerText: ['#EDEDED', '#ffffff', '#e0e0e0', '#b0b0b0', '#ffffffcc'],
  accent: ['#C8601A', '#e07b2a', '#d45d1a', '#b85018', '#a04516'],
  textColor: ['#111111', '#000000', '#1a1a1a', '#2d2d2d', '#333333'],
  ruleColor: ['#5A6B80', '#6b7c93', '#4a5d73', '#7a8db0', '#3a4d63'],
};

/** Values the "Certifications layout" dropdown can hold. */
export const CERT_LAYOUT = {
  VERTICAL: 'vertical',
  GRID_2: 'grid-2',
  GRID_3: 'grid-3',
};

/** Prefix shared by every grid-type certifications layout. */
const CERT_GRID_PREFIX = 'grid';

/** True when the given certifications layout value is one of the grid variants. */
export const isCertGrid = (layout) => Boolean(layout?.startsWith(CERT_GRID_PREFIX));

export const CERT_LAYOUT_OPTIONS = [
  { value: CERT_LAYOUT.VERTICAL, label: 'Vertical (list)' },
  { value: CERT_LAYOUT.GRID_2, label: 'Grid (2 columns)' },
  { value: CERT_LAYOUT.GRID_3, label: 'Grid (3 columns)' },
];

/** Column counts offered when the certifications layout is a grid. */
export const CERT_COLUMN_OPTIONS = [2, 3];
