import {
  CLASSIC_LAYOUT as L,
  DEFAULT_STYLE,
  FONT_WEIGHT_BOLD,
  SECTION_KEYS,
  SECTION_TITLES,
  isCertGrid,
} from '../../../constants';
import { Html, SvgIcon } from '../../common';
import { InfoBlock } from './InfoBlock.jsx';
import { SectionHeading } from './SectionHeading.jsx';

const metaStyle = { fontSize: L.certGridMetaFontSize, color: L.certMetaColor };

/** Compact card used in the grid layouts: icon + title, then dates and issuer. */
function GridCertification({ cert }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: L.certGridIconGap,
          marginBottom: L.certGridTitleMarginBottom,
        }}
      >
        <SvgIcon svg={cert.icon} />
        <Html style={{ fontWeight: FONT_WEIGHT_BOLD }} html={cert.title} />
      </div>
      <Html as="div" html={cert.dates} style={{ ...metaStyle, marginBottom: L.certGridMetaMarginBottom }} />
      <Html as="div" html={cert.issuer} style={metaStyle} />
    </>
  );
}

/** Full-width row used in the vertical layout: icon beside a title/dates/issuer block. */
function ListCertification({ cert }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: L.certListIconGap,
        marginBottom: L.certListMarginBottom,
      }}
    >
      <SvgIcon svg={cert.icon} />
      <InfoBlock rows={[cert.title, cert.dates, cert.issuer]} />
    </div>
  );
}

/** Certifications as a vertical list or a 2/3 column grid, depending on the style. */
export function CertificationsSection({ cv, style }) {
  if (cv.certifications.length === 0) return null;

  const isGrid = isCertGrid(style.certificationsLayout);
  const columns = style.certificationsColumns || DEFAULT_STYLE.certificationsColumns;

  return (
    <>
      <SectionHeading style={style} icon={cv.sectionIcons?.[SECTION_KEYS.CERTIFICATIONS]}>
        {SECTION_TITLES.certifications}
      </SectionHeading>
      <div
        style={{
          display: isGrid ? 'grid' : 'block',
          gridTemplateColumns: isGrid ? `repeat(${columns}, 1fr)` : undefined,
          gap: isGrid ? L.certGridGap : 0,
        }}
      >
        {cv.certifications.map((cert, index) => (
          <div key={index} className="cvb-avoid-break">
            {isGrid ? <GridCertification cert={cert} /> : <ListCertification cert={cert} />}
          </div>
        ))}
      </div>
    </>
  );
}
