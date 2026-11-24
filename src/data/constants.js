/**
 * Default style constants — single source of truth for the Classic layout.
 * All values mirror the defaults in defaultCV.json so the UI and preview stay in sync.
 */
export const DEFAULT_STYLE = {
  // Typography
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
 * Built-in font options for the dropdown.
 * Each entry: [display name, CSS font-family string].
 * Keep in sync with the @font-face definitions in cvBuilder.css.
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

/**
 * Color presets for quick picking (used by the color pickers in the UI).
 */
export const COLOR_PRESETS = {
  headerBg: ['#232B38', '#1a1f2e', '#0d1b2a', '#1b263b', '#16213e'],
  headerText: ['#EDEDED', '#ffffff', '#e0e0e0', '#b0b0b0', '#ffffffcc'],
  accent: ['#C8601A', '#e07b2a', '#d45d1a', '#b85018', '#a04516'],
  textColor: ['#111111', '#000000', '#1a1a1a', '#2d2d2d', '#333333'],
  ruleColor: ['#5A6B80', '#6b7c93', '#4a5d73', '#7a8db0', '#3a4d63'],
};

/**
 * UI styling constants for the editor panel (not CV theme colors).
 */
export const UI = {
  border: '#cfd5de',
  borderDark: '#b9c1ce',
  labelColor: '#5b6472',
  helperText: '#6b7482',
  bg: '#fff',
  bgPanel: '#fafbfc',
  bgHover: '#f0f2f5',
  divider: '#e3e7ed',
};