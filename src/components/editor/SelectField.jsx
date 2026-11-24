import { inlineLabelStyle, inlineSelectStyle, inputStyle, labelStyle } from './styles.js';

/**
 * Labelled dropdown.
 * @param {string} label
 * @param {string|number} value
 * @param {(value: string) => void} onChange - Receives the raw option value (a string)
 * @param {Array<{value: string|number, label: string}>} options
 * @param {string} [placeholder] - Adds an empty first option (used by "pick a preset" menus)
 * @param {boolean} [inline] - Put the label beside the select instead of above it
 */
export function SelectField({ label, value, onChange, options, placeholder, inline = false }) {
  return (
    <label style={inline ? inlineLabelStyle : undefined}>
      <span style={labelStyle}>{label}</span>
      <select
        style={inline ? inlineSelectStyle : inputStyle}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
