import { SECTION_KEYS, SECTION_TITLES, TEXTAREA_ROWS } from '../../../constants';
import { Field } from '../Field.jsx';
import { Section } from '../Section.jsx';

export function SummaryPanel({ cv, actions }) {
  return (
    <Section title={SECTION_TITLES.summary}>
      <Field
        label="Text"
        area
        rows={TEXTAREA_ROWS.summary}
        value={cv.summary}
        onChange={(value) => actions.setValue([SECTION_KEYS.SUMMARY], value)}
      />
    </Section>
  );
}
