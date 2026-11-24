import { NEW_ITEM, SECTION_KEYS, SECTION_TITLES, TEXTAREA_ROWS } from '../../../constants';
import { linesOf, toLines } from '../../../utils';
import { Field } from '../Field.jsx';
import { ListSection } from '../ListSection.jsx';

const KEY = SECTION_KEYS.CUSTOM_SECTIONS;

/** Extra sections (title + paragraph + bullets) printed after Certifications. */
export function CustomSectionsPanel({ cv, actions }) {
  return (
    <ListSection
      title={SECTION_TITLES[KEY]}
      items={cv.customSections}
      addLabel="Add custom section"
      onAdd={() => actions.addItem([KEY], NEW_ITEM[KEY]())}
      onRemove={(index) => actions.removeItem([KEY], index)}
      renderFields={(section, index) => (
        <>
          <Field
            label="Section Title"
            value={section.title}
            onChange={(value) => actions.setValue([KEY, index, 'title'], value)}
          />
          <Field
            label="Content (paragraph)"
            area
            rows={TEXTAREA_ROWS.customContent}
            value={section.content || ''}
            onChange={(value) => actions.setValue([KEY, index, 'content'], value)}
          />
          <Field
            label="Bullets (one per line)"
            area
            rows={TEXTAREA_ROWS.customBullets}
            value={linesOf(section.bullets)}
            onChange={(value) => actions.setValue([KEY, index, 'bullets'], toLines(value))}
          />
        </>
      )}
    />
  );
}
