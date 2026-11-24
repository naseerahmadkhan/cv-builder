import { useRef } from 'react';
import { DEFAULT_STYLE } from '../../constants';
import { usePagination } from '../../hooks';
import { mm } from '../../utils';
import { CVLayout } from '../layout';

/**
 * Live preview that shows the CV as separate A4 sheets, so you can see exactly
 * where the printed pages break.
 *
 * Two copies of the CV are rendered:
 *  1. `.cvb-page` — one continuous copy. Hidden on screen and only measured to
 *     find the page breaks; it is also what the browser prints.
 *  2. `.cvb-sheets` — what you see on screen: one sheet per page, each showing
 *     its slice of the CV (the full CV shifted up and clipped).
 */
export function PagedPreview({ cv }) {
  const measureRef = useRef(null);
  const pages = usePagination(measureRef, cv);
  const pageMarginTop = cv.style.pageMarginTop ?? DEFAULT_STYLE.pageMarginTop;

  return (
    <>
      <div className="cvb-page" ref={measureRef}>
        <CVLayout cv={cv} />
      </div>

      <div className="cvb-sheets">
        {/* Before the first measurement, show everything on one tall sheet. */}
        {(pages ?? [null]).map((page, index) => (
          <div key={index} className="cvb-sheet" data-page={`Page ${index + 1}`}>
            {page ? (
              <div
                style={{
                  // Pages after the first start below the print margin.
                  marginTop: index === 0 ? 0 : mm(pageMarginTop),
                  height: Math.min(page.end - page.start, page.height),
                  overflow: 'hidden',
                }}
              >
                <div style={{ transform: `translateY(${-page.start}px)` }}>
                  <CVLayout cv={cv} />
                </div>
              </div>
            ) : (
              <CVLayout cv={cv} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
