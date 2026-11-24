import { COLOR_INPUT_HEIGHT, COLOR_PRESETS, SWATCH_SIZE, UI, UI_RADIUS } from '../../constants';
import { labelStyle } from './styles.js';

const colorInputStyle = {
  width: '100%',
  height: COLOR_INPUT_HEIGHT,
  padding: 2,
  border: `1px solid ${UI.border}`,
  borderRadius: UI_RADIUS.control,
  background: UI.bg,
};

const presetRowStyle = { display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' };

const swatchStyle = (color) => ({
  width: SWATCH_SIZE,
  height: SWATCH_SIZE,
  borderRadius: UI_RADIUS.swatch,
  border: `1px solid ${UI.border}`,
  background: color,
  cursor: 'pointer',
  flexShrink: 0,
});

/**
 * Color picker with an optional row of preset swatches.
 * @param {string} label
 * @param {string} value - Current hex color
 * @param {(value: string) => void} onChange
 * @param {string} [presetKey] - Key into COLOR_PRESETS (e.g. 'accent')
 */
export function ColorField({ label, value, onChange, presetKey }) {
  const presets = presetKey ? COLOR_PRESETS[presetKey] : null;

  return (
    <label style={{ flex: 1 }}>
      <span style={labelStyle}>{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={colorInputStyle}
      />
      {presets && (
        <div style={presetRowStyle} title="Quick presets">
          {presets.map((color) => (
            <button
              key={color}
              type="button"
              style={swatchStyle(color)}
              onClick={() => onChange(color)}
              aria-label={`Preset ${color}`}
            />
          ))}
        </div>
      )}
    </label>
  );
}
