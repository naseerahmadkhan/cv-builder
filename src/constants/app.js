/** App-wide, non-visual constants: storage, file export and user-facing messages. */

/** localStorage key under which the CV is auto-saved. */
export const STORAGE_KEY = 'cv-builder';

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
  confirmReset: 'Reset everything to the default CV?',
  printHint:
    'In the print dialog choose "Save as PDF", paper A4, margins None, and turn on Background graphics.',
};
