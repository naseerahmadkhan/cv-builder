import { NEW_ITEM, SECTION_KEYS, SECTION_TITLES } from '../../../constants';
import { Field } from '../Field.jsx';
import { IconPicker } from '../IconPicker.jsx';
import { ListSection } from '../ListSection.jsx';

const KEY = SECTION_KEYS.CERTIFICATIONS;

export function CertificationsPanel({ cv, actions }) {
  const set = (index, field) => (value) => actions.setValue([KEY, index, field], value);

  return (
    <ListSection
      title={SECTION_TITLES[KEY]}
      items={cv.certifications}
      addLabel="Add certification"
      onAdd={() => actions.addItem([KEY], NEW_ITEM[KEY]())}
      onRemove={(index) => actions.removeItem([KEY], index)}
      renderFields={(cert, index) => (
        <>
          <Field label="Title" value={cert.title} onChange={set(index, 'title')} />
          <Field label="Dates" value={cert.dates} onChange={set(index, 'dates')} />
          <Field label="Issuer" value={cert.issuer} onChange={set(index, 'issuer')} />
          <IconPicker value={cert.icon} onChange={set(index, 'icon')} />
        </>
      )}
    />
  );
}
