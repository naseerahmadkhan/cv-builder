import { CLASSIC_LAYOUT as L, DEFAULT_STYLE, FONT_WEIGHT_BOLD } from '../../../constants';
import { mm, pt } from '../../../utils';
import { SvgIcon } from '../../common';

/** Dark banner at the top of the first page: name and contact line. */
export function HeaderBanner({ header, style }) {
  // `??` so a deliberate 0 is respected instead of snapping back to the default.
  const paddingTop = style.headerPaddingTop ?? DEFAULT_STYLE.headerPaddingTop;
  const paddingBottom = style.headerPaddingBottom ?? DEFAULT_STYLE.headerPaddingBottom;

  return (
    <div
      className="cvb-avoid-break"
      style={{
        background: style.headerBg,
        color: style.headerText,
        textAlign: 'center',
        padding: `${mm(paddingTop)} ${L.headerSidePadding} ${mm(paddingBottom)}`,
      }}
    >
      <div
        style={{
          fontSize: pt(style.nameSize),
          fontWeight: FONT_WEIGHT_BOLD,
          lineHeight: L.nameLineHeight,
        }}
      >
        {header.name}
      </div>

      <div
        style={{
          fontSize: pt(style.baseSize + L.smallBump),
          marginTop: L.contactsMarginTop,
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: L.contactsGap,
        }}
      >
        {header.contacts.map((contact, index) => (
          <span key={index} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <SvgIcon svg={contact.icon} />
            {contact.text}
          </span>
        ))}
      </div>
    </div>
  );
}
