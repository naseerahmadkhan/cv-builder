import { SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { Card } from '../Card.jsx';
import { IconPicker } from '../IconPicker.jsx';
import { Section } from '../Section.jsx';
import { labelStyle } from '../styles.js';

const ICONS_PATH = [SECTION_KEYS.SECTION_ICONS];

/** "summary" -> "Summary", used to label each icon card. */
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

/** Icon shown beside each CV heading. Removing a card removes that heading's icon. */
export function SectionIconsPanel({ cv, actions }) {
  return (
    <Section title={SECTION_TITLES.sectionIcons}>
      {Object.entries(cv.sectionIcons || {}).map(([key, icon]) => (
        <Card key={key} onRemove={() => actions.removeKey(ICONS_PATH, key)}>
          <span style={labelStyle}>{capitalize(key)} Icon</span>
          <IconPicker value={icon} onChange={(svg) => actions.setValue([...ICONS_PATH, key], svg)} />
        </Card>
      ))}
    </Section>
  );
}
