import { CLASSIC_LAYOUT as L, FONT_WEIGHT_BOLD, SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { pt } from '../../../utils';
import { SectionHeading } from './SectionHeading.jsx';

/** Two-column table: bold label on the left, skills on the right. */
export function SkillsSection({ cv, style }) {
  if (cv.skills.length === 0) return null;

  return (
    <>
      <SectionHeading style={style} icon={cv.sectionIcons?.[SECTION_KEYS.SKILLS]}>
        {SECTION_TITLES.skills}
      </SectionHeading>
      <table style={{ borderCollapse: 'collapse', lineHeight: L.textLineHeight }}>
        <tbody>
          {cv.skills.map((skill, index) => (
            <tr key={index}>
              <td
                style={{
                  padding: 0,
                  fontWeight: FONT_WEIGHT_BOLD,
                  fontSize: pt(style.baseSize + L.smallBump),
                  paddingRight: L.skillLabelGap,
                  verticalAlign: 'top',
                  whiteSpace: 'nowrap',
                }}
              >
                {skill.label}
              </td>
              <td style={{ padding: 0 }}>{skill.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
