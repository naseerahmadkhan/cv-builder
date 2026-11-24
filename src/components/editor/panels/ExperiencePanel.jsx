import { NEW_ITEM, SECTION_KEYS, SECTION_TITLES, TEXTAREA_ROWS } from '../../../constants';
import { linesOf, toLines } from '../../../utils';
import { Field } from '../Field.jsx';
import { ListSection } from '../ListSection.jsx';

const KEY = SECTION_KEYS.EXPERIENCE;

/** Jobs with title, company, website, dates and a bullet list. */
export function ExperiencePanel({ cv, actions }) {
  const set = (index, field) => (value) => actions.setValue([KEY, index, field], value);

  return (
    <ListSection
      title={SECTION_TITLES[KEY]}
      items={cv.experience}
      addLabel="Add job"
      onAdd={() => actions.addItem([KEY], NEW_ITEM[KEY]())}
      onRemove={(index) => actions.removeItem([KEY], index)}
      renderFields={(job, index) => (
        <>
          <Field label="Job title" value={job.title} onChange={set(index, 'title')} />
          <Field label="Company" value={job.company} onChange={set(index, 'company')} />
          <Field label="Website" value={job.url} onChange={set(index, 'url')} />
          <Field label="Dates" value={job.dates} onChange={set(index, 'dates')} />
          <Field
            label="Bullets (one per line)"
            area
            rows={TEXTAREA_ROWS.experienceBullets}
            value={linesOf(job.bullets)}
            onChange={(value) => actions.setValue([KEY, index, 'bullets'], toLines(value))}
          />
        </>
      )}
    />
  );
}
