import { NEW_ITEM, SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { ICONS } from '../../../data/icons.js';
import { Field } from '../Field.jsx';
import { IconPicker } from '../IconPicker.jsx';
import { ListSection } from '../ListSection.jsx';

const CONTACTS_PATH = [SECTION_KEYS.HEADER, 'contacts'];

/** Name plus the contact line (phone, email, links...) shown in the banner. */
export function HeaderPanel({ cv, actions }) {
  return (
    <ListSection
      title={SECTION_TITLES.header}
      items={cv.header.contacts}
      addLabel="Add contact"
      onAdd={() => actions.addItem(CONTACTS_PATH, NEW_ITEM.contact(ICONS.Website))}
      onRemove={(index) => actions.removeItem(CONTACTS_PATH, index)}
      renderFields={(contact, index) => (
        <>
          <Field
            label="Text"
            value={contact.text}
            onChange={(value) => actions.setValue([...CONTACTS_PATH, index, 'text'], value)}
          />
          <IconPicker
            value={contact.icon}
            onChange={(svg) => actions.setValue([...CONTACTS_PATH, index, 'icon'], svg)}
          />
        </>
      )}
    >
      <Field
        label="Name"
        value={cv.header.name}
        onChange={(value) => actions.setValue([SECTION_KEYS.HEADER, 'name'], value)}
      />
    </ListSection>
  );
}
