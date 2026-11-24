import { CLASSIC_LAYOUT as L, FONT_WEIGHT_BOLD } from '../../../constants';
import { Html } from '../../common';

/**
 * Bold stack of lines (title, company, dates...). Empty rows are skipped.
 * @param {string[]} rows - Each row may contain inline HTML
 */
export function InfoBlock({ rows }) {
  return (
    <div
      className="cvb-avoid-break"
      style={{
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: L.textLineHeight,
        marginBottom: L.blockMarginBottom,
      }}
    >
      {rows.map((row, index) => row && <Html key={index} as="div" html={row} />)}
    </div>
  );
}
