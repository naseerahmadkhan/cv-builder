import { MESSAGES } from '../../constants';
import { Button } from './Button.jsx';
import {
  CertificationsPanel,
  CustomSectionsPanel,
  EducationPanel,
  ExperiencePanel,
  HeaderPanel,
  ProjectsPanel,
  SectionIconsPanel,
  SkillsPanel,
  StylePanel,
  SummaryPanel,
} from './panels';
import { Toolbar } from './Toolbar.jsx';

/** Sidebar that edits the CV. Panels are listed in the order they appear on screen. */
export function EditorPanel({ cv, actions }) {
  const handleReset = () => {
    if (confirm(MESSAGES.confirmReset)) actions.reset();
  };

  return (
    <aside className="cvb-panel">
      <Toolbar cv={cv} onLoad={actions.load} />

      <StylePanel cv={cv} actions={actions} />
      <HeaderPanel cv={cv} actions={actions} />
      <SectionIconsPanel cv={cv} actions={actions} />
      <SummaryPanel cv={cv} actions={actions} />
      <SkillsPanel cv={cv} actions={actions} />
      <ExperiencePanel cv={cv} actions={actions} />
      <ProjectsPanel cv={cv} actions={actions} />
      <EducationPanel cv={cv} actions={actions} />
      <CertificationsPanel cv={cv} actions={actions} />
      <CustomSectionsPanel cv={cv} actions={actions} />

      <Button style={{ marginTop: 14 }} onClick={handleReset}>
        Reset to default
      </Button>
    </aside>
  );
}
