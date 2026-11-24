import { CLASSIC_LAYOUT as L } from '../../../constants';
import { HtmlLines } from '../../common';
import { BulletList } from './BulletList.jsx';
import { InfoBlock } from './InfoBlock.jsx';
import { SectionHeading } from './SectionHeading.jsx';

/**
 * User-defined sections printed after Certifications.
 * Each can hold a paragraph, bullets, and (JSON-only) `items` made of info rows.
 */
export function CustomSections({ cv, style }) {
  return cv.customSections?.map((section, index) => (
    <div key={index} style={{ marginTop: L.customSectionMarginTop }}>
      <SectionHeading style={style}>{section.title}</SectionHeading>

      {section.content && (
        <p style={{ margin: `0 0 ${L.customParagraphMarginBottom}px`, lineHeight: L.textLineHeight }}>
          <HtmlLines text={section.content} />
        </p>
      )}

      {section.bullets?.length > 0 && <BulletList items={section.bullets} />}

      {section.items?.map((item, itemIndex) => (
        <InfoBlock key={itemIndex} rows={item.rows} />
      ))}
    </div>
  ));
}
