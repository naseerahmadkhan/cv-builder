import { CLASSIC_LAYOUT as L, DEFAULT_STYLE } from '../../constants';
import { mm, pt } from '../../utils';
import { CertificationsSection } from './classic/CertificationsSection.jsx';
import { CustomSections } from './classic/CustomSections.jsx';
import { EducationSection } from './classic/EducationSection.jsx';
import { ExperienceSection } from './classic/ExperienceSection.jsx';
import { HeaderBanner } from './classic/HeaderBanner.jsx';
import { ProjectsSection } from './classic/ProjectsSection.jsx';
import { SkillsSection } from './classic/SkillsSection.jsx';
import { SummarySection } from './classic/SummarySection.jsx';

/**
 * Classic A4 layout: dark header banner followed by the sections in a fixed order.
 * All sizes and colors come from `cv.style`; fixed measurements live in CLASSIC_LAYOUT.
 */
export default function ClassicLayout({ cv }) {
  const style = cv.style;

  return (
    <div
      style={{
        fontFamily: style.font,
        fontSize: pt(style.baseSize),
        color: style.textColor,
        // `??` so a deliberate 0 is respected instead of snapping back to the default.
        paddingBottom: mm(style.contentPaddingBottom ?? DEFAULT_STYLE.contentPaddingBottom),
        textAlign: style.justifyText ? 'justify' : 'left',
      }}
    >
      <HeaderBanner header={cv.header} style={style} />

      <div style={{ padding: `0 ${L.contentSidePadding}`, paddingTop: L.contentTopPadding }}>
        <SummarySection cv={cv} style={style} />
        <SkillsSection cv={cv} style={style} />
        <ExperienceSection cv={cv} style={style} />
        <ProjectsSection cv={cv} style={style} />
        <EducationSection cv={cv} style={style} />
        <CertificationsSection cv={cv} style={style} />
        <CustomSections cv={cv} style={style} />
      </div>
    </div>
  );
}
