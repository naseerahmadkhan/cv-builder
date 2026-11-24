/**
 * Keys of the CV data object and the headings shown for each section.
 * Used by both the editor panels and the printed layout so they never drift apart.
 */
export const SECTION_KEYS = {
  HEADER: 'header',
  SECTION_ICONS: 'sectionIcons',
  SUMMARY: 'summary',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  CUSTOM_SECTIONS: 'customSections',
};

/** Heading text for each section (editor panel title and CV heading). */
export const SECTION_TITLES = {
  [SECTION_KEYS.HEADER]: 'Header',
  [SECTION_KEYS.SECTION_ICONS]: 'Section Icons',
  [SECTION_KEYS.SUMMARY]: 'Summary',
  [SECTION_KEYS.SKILLS]: 'Skills',
  [SECTION_KEYS.EXPERIENCE]: 'Experience',
  [SECTION_KEYS.PROJECTS]: 'Projects',
  [SECTION_KEYS.EDUCATION]: 'Education',
  [SECTION_KEYS.CERTIFICATIONS]: 'Certifications',
  [SECTION_KEYS.CUSTOM_SECTIONS]: 'Custom Sections',
};

/** Title of the style/layout panel (not a CV data section). */
export const STYLE_PANEL_TITLE = 'Layout and style';
