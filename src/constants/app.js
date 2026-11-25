/** App-wide, non-visual constants: storage, file export and user-facing messages. */

/** localStorage key of the old single-CV save. Only read, to migrate it into the first tab. */
export const LEGACY_STORAGE_KEY = 'cv-builder';

/** localStorage key under which all CVs (tabs) are auto-saved. */
export const STORAGE_KEY = 'cv-builder:workspace';

/** CV tab settings. */
export const TABS = {
  /** Tabs are named "CV 1", "CV 2"... until renamed. */
  defaultNamePrefix: 'CV',
  maxNameLength: 40,
};

/** File export / import settings. */
export const EXPORT = {
  mimeType: 'application/json',
  extension: '.json',
  /** Used for the file name when the CV has no name yet. */
  fallbackName: 'cv',
  /** Number of spaces used to pretty-print the saved JSON. */
  jsonIndent: 2,
};

/** Text shown to the user in dialogs and helper copy. */
export const MESSAGES = {
  invalidJson: 'This file is not a valid CV JSON.',
  confirmReset: 'Reset this CV to the default?',
  confirmDeleteCV: (name) => `Delete "${name}"? This cannot be undone.`,
  printHint:
    'In the print dialog choose "Save as PDF", paper A4, margins None, and turn on Background graphics.',
};
