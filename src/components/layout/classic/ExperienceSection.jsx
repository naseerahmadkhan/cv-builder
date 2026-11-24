import { CLASSIC_LAYOUT as L, SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { BulletList } from './BulletList.jsx';
import { InfoBlock } from './InfoBlock.jsx';
import { SectionHeading } from './SectionHeading.jsx';

/** One block per job: title/company/website/dates, then its bullets. */
export function ExperienceSection({ cv, style }) {
  if (cv.experience.length === 0) return null;

  return (
    <>
      <SectionHeading style={style} icon={cv.sectionIcons?.[SECTION_KEYS.EXPERIENCE]}>
        {SECTION_TITLES.experience}
      </SectionHeading>
      {cv.experience.map((job, index) => (
        <div key={index} style={{ marginBottom: L.experienceMarginBottom }}>
          <InfoBlock rows={[job.title, job.company, job.url, job.dates]} />
          <BulletList items={job.bullets} />
        </div>
      ))}
    </>
  );
}
