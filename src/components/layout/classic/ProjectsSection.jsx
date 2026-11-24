import { CLASSIC_LAYOUT as L, SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { BulletList } from './BulletList.jsx';
import { SectionHeading } from './SectionHeading.jsx';

/** Project names with a nested bullet list each. Can start on a fresh page. */
export function ProjectsSection({ cv, style }) {
  if (cv.projects.length === 0) return null;

  const startsNewPage = style.pageBreakBeforeProjects;

  return (
    <div className={startsNewPage ? 'cvb-page-break-before' : undefined}>
      {/* After a page break the heading sits at the top, so drop its margin. */}
      <SectionHeading
        style={style}
        marginTop={startsNewPage ? 0 : L.headingMarginTop}
        icon={cv.sectionIcons?.[SECTION_KEYS.PROJECTS]}
      >
        {SECTION_TITLES.projects}
      </SectionHeading>
      <ul style={{ margin: 0, paddingLeft: L.listIndent, lineHeight: L.listLineHeight }}>
        {cv.projects.map((project, index) => (
          <li key={index} className="cvb-avoid-break">
            {project.name}
            <BulletList items={project.bullets} nested />
          </li>
        ))}
      </ul>
    </div>
  );
}
