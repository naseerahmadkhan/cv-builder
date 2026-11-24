import { inputStyle, labelStyle } from './styles.js';

/**
 * Labelled text input, or textarea when `area` is set.
 * @param {string} label
 * @param {string} value
 * @param {(value: string) => void} onChange
 * @param {boolean} [area] - Render a multi-line textarea
 * @param {number} [rows] - Textarea height in rows
 */
export function Field({ label, value, onChange, area = false, rows = 3 }) {
  return (
    <label>
      <span style={labelStyle}>{label}</span>
      {area ? (
        <textarea
          style={{ ...inputStyle, resize: 'vertical' }}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input style={inputStyle} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
