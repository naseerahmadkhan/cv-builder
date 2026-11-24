import { useEffect, useState } from 'react';
import { DEFAULT_STYLE } from '../constants';
import { paginate, samePages } from '../utils';

/**
 * Work out where the printed pages break, so the preview can show them.
 *
 * Measures the continuous CV inside `measureRef` and recalculates whenever the
 * CV changes or web fonts finish loading (text width, and so line breaks, depend on them).
 *
 * @param {React.RefObject<HTMLElement>} measureRef - Container holding the continuous CV
 * @param {object} cv
 * @returns {Array<{start: number, end: number, height: number}> | null}
 *   Pages, or null until the first measurement.
 */
export function usePagination(measureRef, cv) {
  const [pages, setPages] = useState(null);
  const pageMarginTop = cv.style.pageMarginTop ?? DEFAULT_STYLE.pageMarginTop;

  useEffect(() => {
    let frame = 0;

    // Wait one frame so the new CV has been laid out, and merge rapid edits.
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!measureRef.current) return;
        const next = paginate(measureRef.current, pageMarginTop);
        setPages((previous) => (samePages(previous, next) ? previous : next));
      });
    };

    measure();
    document.fonts?.ready.then(measure);
    document.fonts?.addEventListener('loadingdone', measure);

    return () => {
      cancelAnimationFrame(frame);
      document.fonts?.removeEventListener('loadingdone', measure);
    };
  }, [cv, pageMarginTop, measureRef]);

  return pages;
}
