/**
 * Paper and pagination constants for the on-screen page preview.
 * PAGE must match --cvb-page-width / --cvb-page-height in styles/cvBuilder.css.
 */
export const PAGE = {
  widthMm: 210, // A4
  heightMm: 297, // A4
};

/** CSS defines 96px per inch, 25.4mm per inch. */
export const MM_TO_PX = 96 / 25.4;

/** Measurement noise (px) tolerated when comparing positions. */
export const PAGINATION_EPSILON = 1;

/**
 * Selector for elements that must not be split across pages.
 * The layout adds this class; the print stylesheet and the preview both honor it.
 */
export const AVOID_BREAK_CLASS = 'cvb-avoid-break';

/** Class on an element that must start on a new page. */
export const BREAK_BEFORE_CLASS = 'cvb-page-break-before';
