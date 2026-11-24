import { NEW_ITEM, SECTION_KEYS, SECTION_TITLES, TEXTAREA_ROWS } from '../../../constants';
import { linesOf, toLines } from '../../../utils';
import { Field } from '../Field.jsx';
import { ListSection } from '../ListSection.jsx';

const KEY = SECTION_KEYS.PROJECTS;

export function ProjectsPanel({ cv, actions }) {
  return (
    <ListSection
      title={SECTION_TITLES[KEY]}
      items={cv.projects}
      addLabel="Add project"
      onAdd={() => actions.addItem([KEY], NEW_ITEM[KEY]())}
      onRemove={(index) => actions.removeItem([KEY], index)}
      renderFields={(project, index) => (
        <>
          <Field
            label="Project name"
            value={project.name}
            onChange={(value) => actions.setValue([KEY, index, 'name'], value)}
          />
          <Field
            label="Bullets (one per line)"
            area
            rows={TEXTAREA_ROWS.projectBullets}
            value={linesOf(project.bullets)}
            onChange={(value) => actions.setValue([KEY, index, 'bullets'], toLines(value))}
          />
        </>
      )}
    />
  );
}
