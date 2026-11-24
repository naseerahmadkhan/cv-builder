import { inlineLabelStyle } from './styles.js';

/** Checkbox with its label text beside it. */
export function CheckboxField({ label, checked, onChange }) {
  return (
    <label style={inlineLabelStyle}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
