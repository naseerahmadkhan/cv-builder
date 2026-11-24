import { NUMBER_INPUT_DEFAULTS } from '../../constants';
import { inputStyle, labelStyle } from './styles.js';

/**
 * Labelled number input. Empty or invalid input falls back to `min`.
 * @param {string} label
 * @param {number} value
 * @param {(value: number) => void} onChange
 */
export function NumberField({
  label,
  value,
  onChange,
  min = NUMBER_INPUT_DEFAULTS.min,
  max = NUMBER_INPUT_DEFAULTS.max,
  step = NUMBER_INPUT_DEFAULTS.step,
}) {
  return (
    <label style={{ flex: 1 }}>
      <span style={labelStyle}>{label}</span>
      <input
        style={inputStyle}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || min)}
      />
    </label>
  );
}
