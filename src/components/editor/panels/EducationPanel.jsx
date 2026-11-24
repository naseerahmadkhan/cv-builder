import { NEW_ITEM, SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { Field } from '../Field.jsx';
import { ListSection } from '../ListSection.jsx';

const KEY = SECTION_KEYS.EDUCATION;

export function EducationPanel({ cv, actions }) {
  const set = (index, field) => (value) => actions.setValue([KEY, index, field], value);

  return (
    <ListSection
      title={SECTION_TITLES[KEY]}
      items={cv.education}
      addLabel="Add education"
      onAdd={() => actions.addItem([KEY], NEW_ITEM[KEY]())}
      onRemove={(index) => actions.removeItem([KEY], index)}
      renderFields={(entry, index) => (
        <>
          <Field label="Degree" value={entry.degree} onChange={set(index, 'degree')} />
          <Field label="Extra (e.g. CGPA)" value={entry.extra} onChange={set(index, 'extra')} />
          <Field label="Dates" value={entry.dates} onChange={set(index, 'dates')} />
          <Field label="School" value={entry.school} onChange={set(index, 'school')} />
        </>
      )}
    />
  );
}
