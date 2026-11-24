import { CLASSIC_LAYOUT as L, FONT_WEIGHT_BOLD } from '../../../constants';
import { pt } from '../../../utils';
import { SvgIcon } from '../../common';

/**
 * Section heading (h2) with an optional icon.
 * @param {object} style - CV style (accent color, heading size)
 * @param {number} [marginTop] - Space above the heading in px
 * @param {string} [icon] - SVG markup
 */
export function SectionHeading({ style, marginTop = L.headingMarginTop, icon, children }) {
  return (
    <h2
      style={{
        margin: `${marginTop}px 0 ${L.headingMarginBottom}px`,
        color: style.accent,
        fontSize: pt(style.headingSize),
        fontWeight: FONT_WEIGHT_BOLD,
        breakAfter: 'avoid',
        display: 'flex',
        alignItems: 'center',
        gap: L.headingIconGap,
      }}
    >
      <SvgIcon svg={icon} />
      {children}
    </h2>
  );
}
