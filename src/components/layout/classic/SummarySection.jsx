import { CLASSIC_LAYOUT as L, SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { HtmlLines } from '../../common';
import { SectionHeading } from './SectionHeading.jsx';

/** Short profile paragraph, closed by a horizontal rule. */
export function SummarySection({ cv, style }) {
  if (!cv.summary) return null;

  return (
    <>
      {/* First section on the page, so no space above the heading. */}
      <SectionHeading style={style} marginTop={0} icon={cv.sectionIcons?.[SECTION_KEYS.SUMMARY]}>
        {SECTION_TITLES.summary}
      </SectionHeading>
      <p
        style={{
          margin: 0,
          paddingBottom: L.summaryPaddingBottom,
          lineHeight: L.textLineHeight,
          borderBottom: `${L.ruleWidth} solid ${style.ruleColor}`,
        }}
      >
        <HtmlLines text={cv.summary} />
      </p>
    </>
  );
}
