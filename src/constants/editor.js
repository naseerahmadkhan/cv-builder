/**
 * Configuration for the editor sidebar: which style controls exist, their
 * limits, textarea sizes and the templates used when adding new list items.
 */
import { SECTION_KEYS } from './sections.js';

/** Fallback range for numeric inputs that do not specify their own. */
export const NUMBER_INPUT_DEFAULTS = { min: 6, max: 60, step: 0.5 };

/** Range shared by the millimetre-based spacing inputs. */
const MM_RANGE = { min: 0, max: 30, step: 0.5 };

/** Font-size controls (pt). Rendered in one row. */
export const TYPOGRAPHY_FIELDS = [
  { key: 'baseSize', label: 'Body size (pt)' },
  { key: 'headingSize', label: 'Heading (pt)' },
  { key: 'nameSize', label: 'Name (pt)' },
];

/** Color controls. `key` is both the style property and the COLOR_PRESETS key. */
export const COLOR_FIELDS = [
  { key: 'headerBg', label: 'Header bg' },
  { key: 'headerText', label: 'Header text' },
  { key: 'accent', label: 'Headings' },
  { key: 'textColor', label: 'Body text' },
  { key: 'ruleColor', label: 'Rule color' },
];

/** Spacing controls for the header banner (mm). */
export const HEADER_SPACING_FIELDS = [
  { key: 'headerPaddingTop', label: 'Header top padding (mm)', ...MM_RANGE },
  { key: 'headerPaddingBottom', label: 'Header bottom padding (mm)', ...MM_RANGE },
];

/** Spacing controls for the page body (mm). */
export const PAGE_SPACING_FIELDS = [
  { key: 'contentPaddingBottom', label: 'Content bottom padding (mm)', ...MM_RANGE },
  { key: 'pageMarginTop', label: 'Subsequent pages top margin (mm)', min: 0, max: 50, step: 0.5 },
];

/** Visible rows for the multi-line inputs. */
export const TEXTAREA_ROWS = {
  iconSvg: 3,
  summary: 7,
  experienceBullets: 8,
  projectBullets: 5,
  customContent: 3,
  customBullets: 5,
};

/**
 * Factories for the blank item created by each "Add ..." button.
 * Factories (not shared objects) so every new item gets its own arrays.
 */
export const NEW_ITEM = {
  contact: (icon) => ({ icon, text: '' }),
  [SECTION_KEYS.SKILLS]: () => ({ label: '', value: '' }),
  [SECTION_KEYS.EXPERIENCE]: () => ({ title: '', company: '', url: '', dates: '', bullets: [''] }),
  [SECTION_KEYS.PROJECTS]: () => ({ name: '', bullets: [''] }),
  [SECTION_KEYS.EDUCATION]: () => ({ degree: '', extra: '', dates: '', school: '' }),
  [SECTION_KEYS.CERTIFICATIONS]: () => ({ title: '', dates: '', issuer: '', icon: '' }),
  [SECTION_KEYS.CUSTOM_SECTIONS]: () => ({ title: '', content: '', bullets: [] }),
};
