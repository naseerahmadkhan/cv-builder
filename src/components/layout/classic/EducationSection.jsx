import { EDUCATION_EXTRA_SEPARATOR, SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { InfoBlock } from './InfoBlock.jsx';
import { SectionHeading } from './SectionHeading.jsx';

/** Degree (with optional extra such as CGPA), dates and school. */
export function EducationSection({ cv, style }) {
  if (cv.education.length === 0) return null;

  return (
    <>
      <SectionHeading style={style} icon={cv.sectionIcons?.[SECTION_KEYS.EDUCATION]}>
        {SECTION_TITLES.education}
      </SectionHeading>
      {cv.education.map((entry, index) => {
        const degreeLine = entry.extra
          ? `${entry.degree}${EDUCATION_EXTRA_SEPARATOR}${entry.extra}`
          : entry.degree;
        return <InfoBlock key={index} rows={[degreeLine, entry.dates, entry.school]} />;
      })}
    </>
  );
}
