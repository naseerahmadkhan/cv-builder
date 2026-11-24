import { TEXTAREA_ROWS } from '../../constants';
import { ICONS } from '../../data/icons.js';
import { Field } from './Field.jsx';
import { SelectField } from './SelectField.jsx';

const PRESET_OPTIONS = Object.keys(ICONS).map((name) => ({ value: name, label: name }));

/**
 * Lets the user pick a built-in icon or paste their own SVG markup.
 * @param {string} value - Current SVG markup
 * @param {(svg: string) => void} onChange
 */
export function IconPicker({ value, onChange }) {
  // The select is only a launcher: choosing a preset copies its SVG into the
  // textarea below, then the select resets to the placeholder.
  const handlePreset = (name) => {
    if (name) onChange(ICONS[name]);
  };

  return (
    <>
      <SelectField
        label="Icon preset"
        value=""
        onChange={handlePreset}
        options={PRESET_OPTIONS}
        placeholder="Choose a preset…"
      />
      <Field
        label="Icon SVG code (optional)"
        area
        rows={TEXTAREA_ROWS.iconSvg}
        value={value || ''}
        onChange={onChange}
      />
    </>
  );
}
