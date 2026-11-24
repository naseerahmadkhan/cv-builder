/**
 * Measurements for the printed CV (Classic layout).
 * Plain numbers are px, strings carry their own unit (mm, etc).
 * Values that the user can change live in DEFAULT_STYLE instead.
 */
export const CLASSIC_LAYOUT = {
  // Page structure
  contentSidePadding: '16mm',
  contentTopPadding: '9mm',
  headerSidePadding: '8mm',

  // Line heights
  nameLineHeight: 1.2,
  textLineHeight: 1.5,
  listLineHeight: 1.45,

  // Header banner
  contactsMarginTop: 6,
  contactsGap: '2mm 8mm',
  /** Contacts and skill labels are one pt larger than body text. */
  smallBump: 1,

  // Section headings
  headingMarginTop: 14,
  headingMarginBottom: 6,
  headingIconGap: 8,

  // Summary
  summaryPaddingBottom: 8,
  ruleWidth: '1.5px',

  // Lists and blocks
  listIndent: '6mm',
  blockMarginBottom: 6,
  experienceMarginBottom: 8,
  skillLabelGap: '6mm',

  // Certifications
  certGridGap: 12,
  certGridIconGap: 6,
  certGridTitleMarginBottom: 4,
  certGridMetaMarginBottom: 2,
  certGridMetaFontSize: '0.9em',
  certListIconGap: 8,
  certListMarginBottom: 8,
  certMetaColor: '#666',

  // Custom sections
  customSectionMarginTop: 14,
  customParagraphMarginBottom: 8,
};

/** Spaces between a degree and its extra (e.g. CGPA) on one line. */
export const EDUCATION_EXTRA_SEPARATOR = '      ';

/** Font weight used for names, headings and labels. */
export const FONT_WEIGHT_BOLD = 700;
