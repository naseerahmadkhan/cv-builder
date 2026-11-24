import { DEFAULT_LAYOUT_KEY } from '../../constants';
import { LAYOUTS } from './layouts.js';

/**
 * Renders the CV with whichever layout `cv.layout` names,
 * falling back to the default layout for unknown keys.
 */
export function CVLayout({ cv }) {
  const layout = LAYOUTS[cv.layout] || LAYOUTS[DEFAULT_LAYOUT_KEY];
  return <layout.Component cv={cv} />;
}
