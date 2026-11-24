import { COLOR_PRESETS, UI } from '../../data/constants.js';

const lbl = {
  display: 'block',
  fontFamily: 'system-ui, sans-serif',
  fontSize: 12,
  color: UI.labelColor,
  margin: '8px 0 3px',
};

const presetRow = {
  display: 'flex',
  gap: 4,
  marginTop: 4,
  flexWrap: 'wrap',
};

const presetBtn = (color) => ({
  width: 20,
  height: 20,
  borderRadius: 4,
  border: `1px solid ${UI.border}`,
  background: color,
  cursor: 'pointer',
  flexShrink: 0,
});

/**
 * Color picker with optional preset palette.
 * @param {string} label - Label text
 * @param {string} value - Current hex color
 * @param {(v: string) => void} onChange - Callback with new hex color
 * @param {string} [presetKey] - Key into COLOR_PRESETS (e.g., 'accent', 'headerBg')
 */
export function Color({ label, value, onChange, presetKey }) {
  const presets = presetKey ? COLOR_PRESETS[presetKey] : null;
  return (
    <label style={{ flex: 1 }}>
      <span style={lbl}>{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          height: 32,
          padding: 2,
          border: `1px solid ${UI.border}`,
          borderRadius: 6,
          background: UI.bg,
        }}
      />
      {presets && (
        <div style={presetRow} title="Quick presets">
          {presets.map((c, i) => (
            <button
              key={i}
              type="button"
              style={presetBtn(c)}
              onClick={() => onChange(c)}
              aria-label={`Preset ${c}`}
            />
          ))}
        </div>
      )}
    </label>
  );
}