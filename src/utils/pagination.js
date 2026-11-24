import {
  AVOID_BREAK_CLASS,
  BREAK_BEFORE_CLASS,
  DEFAULT_STYLE,
  MM_TO_PX,
  PAGE,
  PAGINATION_EPSILON,
} from '../constants';

/**
 * Decide where each printed page starts.
 *
 * Mirrors the browser's print rules for this CV: a page holds a fixed height,
 * "atoms" (blocks, list items, text lines) are never cut in half, a heading is
 * kept with whatever follows it, and some elements force a new page.
 *
 * All positions are px measured from the top of the continuous (unpaginated) CV.
 *
 * @param {object} input
 * @param {Array<{top: number, bottom: number, keepWithNext?: boolean}>} input.atoms
 *   Unsplittable pieces, sorted by `top`.
 * @param {number[]} input.forcedBreaks - Positions where a new page must start.
 * @param {number} input.firstPageHeight - Usable height of page 1
 * @param {number} input.nextPageHeight - Usable height of pages 2+ (smaller: top margin)
 * @param {number} input.totalHeight - Height of the whole CV
 * @returns {number[]} Start position of every page; the first is always 0.
 */
export function computePageStarts({ atoms, forcedBreaks, firstPageHeight, nextPageHeight, totalHeight }) {
  const eps = PAGINATION_EPSILON;
  const starts = [0];

  while (true) {
    const start = starts[starts.length - 1];
    const limit = start + (starts.length === 1 ? firstPageHeight : nextPageHeight);

    // Everything left fits on this page.
    if (totalHeight <= limit + eps) break;

    // An explicit "start on a new page" element inside this page wins.
    const forced = forcedBreaks.find((y) => y > start + eps && y <= limit + eps);
    if (forced !== undefined) {
      starts.push(forced);
      continue;
    }

    // Otherwise break before the first atom that would run past the page end.
    const crossing = atoms.findIndex((atom) => atom.bottom > limit + eps);
    if (crossing === -1) {
      // Only trailing padding spills over: the browser still prints it as an
      // (empty) extra page, so show that page too instead of hiding the problem.
      starts.push(limit);
      continue;
    }

    let next;
    if (atoms[crossing].top <= start + eps) {
      // Taller than a page: nothing to move, so cut at the page end.
      next = limit;
    } else {
      next = atoms[crossing].top;
      // Never leave a heading stranded at the bottom of a page.
      for (let i = crossing - 1; i >= 0 && atoms[i].keepWithNext && atoms[i].top > start + eps; i--) {
        next = atoms[i].top;
      }
    }
    starts.push(next);
  }

  return starts;
}

/** Split a paragraph into one atom per rendered line. */
function lineAtoms(paragraph, origin) {
  const range = document.createRange();
  range.selectNodeContents(paragraph);

  const rects = [...range.getClientRects()]
    .filter((rect) => rect.height > 0)
    .sort((a, b) => a.top - b.top);

  const lines = [];
  for (const rect of rects) {
    const line = lines[lines.length - 1];
    // Fragments that overlap vertically belong to the same line.
    if (line && rect.top < line.bottom - PAGINATION_EPSILON) {
      line.bottom = Math.max(line.bottom, rect.bottom - origin);
    } else {
      lines.push({ top: rect.top - origin, bottom: rect.bottom - origin });
    }
  }
  return lines;
}

/**
 * Measure the rendered CV and work out its pages.
 *
 * @param {HTMLElement} root - The continuous (unpaginated) CV container
 * @param {number} pageMarginTopMm - Top margin of pages 2+ (mm)
 * @returns {Array<{start: number, end: number, height: number}>}
 *   One entry per page: the slice [start, end) of the CV (px) and the
 *   usable page height (px) it must be clipped to.
 */
export function paginate(root, pageMarginTopMm) {
  const origin = root.getBoundingClientRect().top;
  const relative = (rect) => ({ top: rect.top - origin, bottom: rect.bottom - origin });

  const atoms = [];
  root.querySelectorAll(`.${AVOID_BREAK_CLASS}, h2, tr, p`).forEach((el) => {
    // Only the outermost unsplittable block counts (e.g. a project, not its bullets).
    if (el.parentElement.closest(`.${AVOID_BREAK_CLASS}`)) return;

    if (el.tagName === 'P') {
      atoms.push(...lineAtoms(el, origin));
    } else {
      atoms.push({ ...relative(el.getBoundingClientRect()), keepWithNext: el.tagName === 'H2' });
    }
  });
  atoms.sort((a, b) => a.top - b.top);

  const forcedBreaks = [...root.querySelectorAll(`.${BREAK_BEFORE_CLASS}`)]
    .map((el) => el.getBoundingClientRect().top - origin)
    .sort((a, b) => a - b);

  const marginMm = pageMarginTopMm ?? DEFAULT_STYLE.pageMarginTop;
  const firstPageHeight = PAGE.heightMm * MM_TO_PX;
  const nextPageHeight = (PAGE.heightMm - marginMm) * MM_TO_PX;
  const totalHeight = root.scrollHeight;

  const starts = computePageStarts({ atoms, forcedBreaks, firstPageHeight, nextPageHeight, totalHeight });

  return starts.map((start, index) => ({
    start,
    end: starts[index + 1] ?? totalHeight,
    height: index === 0 ? firstPageHeight : nextPageHeight,
  }));
}

/** True when two page lists describe the same pagination (avoids needless re-renders). */
export function samePages(a, b) {
  return (
    a?.length === b.length &&
    a.every((page, i) => Math.abs(page.start - b[i].start) < 0.5 && Math.abs(page.end - b[i].end) < 0.5)
  );
}
