import { NEW_ITEM, SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { Field } from '../Field.jsx';
import { ListSection } from '../ListSection.jsx';

const KEY = SECTION_KEYS.SKILLS;

/** Rows of "label: comma separated skills". */
export function SkillsPanel({ cv, actions }) {
  return (
    <ListSection
      title={SECTION_TITLES[KEY]}
      items={cv.skills}
      addLabel="Add skill row"
      onAdd={() => actions.addItem([KEY], NEW_ITEM[KEY]())}
      onRemove={(index) => actions.removeItem([KEY], index)}
      renderFields={(skill, index) => (
        <>
          <Field
            label="Label"
            value={skill.label}
            onChange={(value) => actions.setValue([KEY, index, 'label'], value)}
          />
          <Field
            label="Skills"
            value={skill.value}
            onChange={(value) => actions.setValue([KEY, index, 'value'], value)}
          />
        </>
      )}
    />
  );
}
