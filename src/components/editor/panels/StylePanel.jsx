import {
  CERT_COLUMN_OPTIONS,
  CERT_LAYOUT_OPTIONS,
  COLOR_FIELDS,
  DEFAULT_STYLE,
  FONTS,
  HEADER_SPACING_FIELDS,
  PAGE_SPACING_FIELDS,
  STYLE_PANEL_TITLE,
  TYPOGRAPHY_FIELDS,
  isCertGrid,
} from '../../../constants';
import { LAYOUTS } from '../../layout';
import { CheckboxField } from '../CheckboxField.jsx';
import { ColorField } from '../ColorField.jsx';
import { NumberField } from '../NumberField.jsx';
import { Section } from '../Section.jsx';
import { SelectField } from '../SelectField.jsx';
import { rowStyle } from '../styles.js';

const LAYOUT_OPTIONS = Object.entries(LAYOUTS).map(([value, { label }]) => ({ value, label }));
const FONT_OPTIONS = FONTS.map(([label, value]) => ({ value, label }));

/** Layout choice, fonts, colors, toggles and spacing. */
export function StylePanel({ cv, actions }) {
  const style = cv.style;

  // Renders a numeric style control; `?? default` keeps a deliberate 0 intact.
  const renderNumber = ({ key, label, ...range }) => (
    <NumberField
      key={key}
      label={label}
      value={style[key] ?? DEFAULT_STYLE[key]}
      onChange={(value) => actions.setStyle(key, value)}
      {...range}
    />
  );

  return (
    <Section title={STYLE_PANEL_TITLE}>
      <SelectField
        label="Layout"
        value={cv.layout}
        onChange={(value) => actions.setValue(['layout'], value)}
        options={LAYOUT_OPTIONS}
      />

      <SelectField
        label="Font"
        value={style.font}
        onChange={(value) => actions.setStyle('font', value)}
        options={FONT_OPTIONS}
      />

      <div style={rowStyle}>{TYPOGRAPHY_FIELDS.map(renderNumber)}</div>

      <div style={{ ...rowStyle, flexWrap: 'wrap' }}>
        {COLOR_FIELDS.map(({ key, label }) => (
          <ColorField
            key={key}
            label={label}
            value={style[key]}
            presetKey={key}
            onChange={(value) => actions.setStyle(key, value)}
          />
        ))}
      </div>

      <CheckboxField
        label="Start Projects on a new page"
        checked={style.pageBreakBeforeProjects}
        onChange={(checked) => actions.setStyle('pageBreakBeforeProjects', checked)}
      />

      <SelectField
        inline
        label="Certifications layout"
        value={style.certificationsLayout}
        onChange={(value) => actions.setStyle('certificationsLayout', value)}
        options={CERT_LAYOUT_OPTIONS}
      />

      {isCertGrid(style.certificationsLayout) && (
        <SelectField
          inline
          label="Columns"
          value={style.certificationsColumns || DEFAULT_STYLE.certificationsColumns}
          onChange={(value) => actions.setStyle('certificationsColumns', Number(value))}
          options={CERT_COLUMN_OPTIONS.map((n) => ({ value: n, label: String(n) }))}
        />
      )}

      <CheckboxField
        label="Justify text"
        checked={style.justifyText}
        onChange={(checked) => actions.setStyle('justifyText', checked)}
      />

      <div style={{ ...rowStyle, marginTop: 10 }}>{HEADER_SPACING_FIELDS.map(renderNumber)}</div>
      <div style={{ ...rowStyle, marginTop: 10 }}>{PAGE_SPACING_FIELDS.map(renderNumber)}</div>
    </Section>
  );
}
