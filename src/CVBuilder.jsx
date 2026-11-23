import { useState, useEffect, useRef } from 'react';
import { DEFAULT_CV } from './data/defaultCV.js';
import { ICONS } from './data/icons.js';
import { FONTS } from './data/fonts.js';
import { LAYOUTS } from './data/layouts.js';
import { merge, linesOf, toLines } from './utils/helpers.js';
import { loadFromStorage, saveToStorage, downloadJson, readJsonFile } from './utils/storage.js';
import { Field, Num, Color, Section, Card } from './components/index.js';
import './styles/cvBuilder.css';

const btn = {
  padding: '7px 12px',
  border: '1px solid #b9c1ce',
  borderRadius: 6,
  background: '#fff',
  font: '13px system-ui, sans-serif',
  cursor: 'pointer',
};

const btnMain = { ...btn, background: '#232B38', color: '#fff', borderColor: '#232B38' };

export default function CVBuilder() {
  const [cv, setCv] = useState(() => {
    const stored = loadFromStorage();
    if (stored) return merge(stored, DEFAULT_CV, ICONS);
    return DEFAULT_CV;
  });

  const fileRef = useRef(null);

  useEffect(() => {
    saveToStorage(cv);
  }, [cv]);

  const edit = (fn) => setCv((prev) => {
    const n = structuredClone(prev);
    fn(n);
    return n;
  });

  const setStyle = (k, v) => edit((d) => { d.style[k] = v; });
  const listEdit = (key, i, k, v) => edit((d) => { d[key][i][k] = v; });
  const add = (key, item) => edit((d) => { d[key].push(item); });
  const remove = (key, i) => edit((d) => { d[key].splice(i, 1); });

  const handleSaveJson = () => downloadJson(cv);

  const handleLoadJson = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const content = await readJsonFile(file);
      const parsed = JSON.parse(content);
      setCv(merge(parsed, DEFAULT_CV, ICONS));
    } catch {
      alert('This file is not a valid CV JSON.');
    }
    e.target.value = '';
  };

  const Layout = (LAYOUTS[cv.layout] || LAYOUTS.classic).Component;
  const s = cv.style;

  return (
    <div className="cvb">
      <aside className="cvb-panel">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
          <button style={btnMain} onClick={() => window.print()}>Export PDF</button>
          <button style={btn} onClick={handleSaveJson}>Save JSON</button>
          <button style={btn} onClick={() => fileRef.current.click()}>Load JSON</button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={handleLoadJson} />
        </div>
        <p style={{ font: '12px system-ui', color: '#6b7482', margin: '4px 0 8px' }}>
          In the print dialog choose "Save as PDF", paper A4, margins None, and turn on Background graphics.
        </p>

        <Section title="Layout and style" open>
          <label>
            <span style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#5b6472', margin: '8px 0 3px' }}>Layout</span>
            <select
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '6px 8px',
                border: '1px solid #cfd5de',
                borderRadius: 6,
                font: '13px system-ui, sans-serif',
                background: '#fff',
              }}
              value={cv.layout}
              onChange={(e) => edit((d) => { d.layout = e.target.value; })}
            >
              {Object.entries(LAYOUTS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </label>

          <label>
            <span style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#5b6472', margin: '8px 0 3px' }}>Font</span>
            <select
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '6px 8px',
                border: '1px solid #cfd5de',
                borderRadius: 6,
                font: '13px system-ui, sans-serif',
                background: '#fff',
              }}
              value={s.font}
              onChange={(e) => setStyle('font', e.target.value)}
            >
              {FONTS.map(([n, v]) => (
                <option key={n} value={v}>{n}</option>
              ))}
            </select>
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <Num label="Body size (pt)" value={s.baseSize} onChange={(v) => setStyle('baseSize', v)} />
            <Num label="Heading (pt)" value={s.headingSize} onChange={(v) => setStyle('headingSize', v)} />
            <Num label="Name (pt)" value={s.nameSize} onChange={(v) => setStyle('nameSize', v)} />
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Color label="Header bg" value={s.headerBg} onChange={(v) => setStyle('headerBg', v)} />
            <Color label="Header text" value={s.headerText} onChange={(v) => setStyle('headerText', v)} />
            <Color label="Headings" value={s.accent} onChange={(v) => setStyle('accent', v)} />
            <Color label="Body text" value={s.textColor} onChange={(v) => setStyle('textColor', v)} />
          </div>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10, font: '13px system-ui' }}>
            <input
              type="checkbox"
              checked={s.pageBreakBeforeProjects}
              onChange={(e) => setStyle('pageBreakBeforeProjects', e.target.checked)}
            />
            Start Projects on a new page
          </label>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10, font: '13px system-ui' }}>
            <span style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#5b6472', margin: '8px 0 3px' }}>Certifications layout</span>
            <select
              style={{ width: 'auto', boxSizing: 'border-box', padding: '6px 8px', border: '1px solid #cfd5de', borderRadius: 6, font: '13px system-ui, sans-serif', background: '#fff' }}
              value={s.certificationsLayout}
              onChange={(e) => setStyle('certificationsLayout', e.target.value)}
            >
              <option value="vertical">Vertical (list)</option>
              <option value="grid-2">Grid (2 columns)</option>
              <option value="grid-3">Grid (3 columns)</option>
            </select>
          </label>

          {s.certificationsLayout?.startsWith('grid') && (
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10, font: '13px system-ui' }}>
              <span style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#5b6472', margin: '8px 0 3px' }}>Columns</span>
              <select
                style={{ width: 'auto', boxSizing: 'border-box', padding: '6px 8px', border: '1px solid #cfd5de', borderRadius: 6, font: '13px system-ui, sans-serif', background: '#fff' }}
                value={s.certificationsColumns || 2}
                onChange={(e) => setStyle('certificationsColumns', Number(e.target.value))}
              >
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label>
          )}
        </Section>

        <Section title="Header">
          <Field
            label="Name"
            value={cv.header.name}
            onChange={(v) => edit((d) => { d.header.name = v; })}
          />
          {cv.header.contacts.map((c, i) => (
            <Card key={i} onRemove={() => edit((d) => { d.header.contacts.splice(i, 1); })}>
              <Field
                label="Text"
                value={c.text}
                onChange={(v) => edit((d) => { d.header.contacts[i].text = v; })}
              />
              <label>
                <span style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#5b6472', margin: '8px 0 3px' }}>Icon preset</span>
                <select
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '6px 8px',
                    border: '1px solid #cfd5de',
                    borderRadius: 6,
                    font: '13px system-ui, sans-serif',
                    background: '#fff',
                  }}
                  value=""
                  onChange={(e) => e.target.value && edit((d) => { d.header.contacts[i].icon = ICONS[e.target.value]; })}
                >
                  <option value="">Choose a preset…</option>
                  {Object.keys(ICONS).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
              <Field
                label="Icon SVG code (optional)"
                area
                rows={3}
                value={c.icon}
                onChange={(v) => edit((d) => { d.header.contacts[i].icon = v; })}
              />
            </Card>
          ))}
          <button style={btn} onClick={() => edit((d) => { d.header.contacts.push({ icon: ICONS.Website, text: '' }); })}>
            Add contact
          </button>
        </Section>

        <Section title="Section Icons">
          {Object.entries(cv.sectionIcons || {}).map(([key, icon]) => (
            <Card key={key} onRemove={() => edit((d) => { delete d.sectionIcons[key]; })}>
              <label style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#5b6472', margin: '8px 0 3px' }}>
                {key.charAt(0).toUpperCase() + key.slice(1)} Icon
              </label>
              <label>
                <span style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#5b6472', margin: '8px 0 3px' }}>Icon preset</span>
                <select
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '6px 8px',
                    border: '1px solid #cfd5de',
                    borderRadius: 6,
                    font: '13px system-ui, sans-serif',
                    background: '#fff',
                  }}
                  value=""
                  onChange={(e) => e.target.value && edit((d) => { d.sectionIcons[key] = ICONS[e.target.value]; })}
                >
                  <option value="">Choose a preset…</option>
                  {Object.keys(ICONS).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
              <Field
                label="Icon SVG code (optional)"
                area
                rows={3}
                value={icon}
                onChange={(v) => edit((d) => { d.sectionIcons[key] = v; })}
              />
            </Card>
          ))}
        </Section>

        <Section title="Summary">
          <Field
            label="Text"
            area
            rows={7}
            value={cv.summary}
            onChange={(v) => edit((d) => { d.summary = v; })}
          />
        </Section>

        <Section title="Skills">
          {cv.skills.map((k, i) => (
            <Card key={i} onRemove={() => remove('skills', i)}>
              <Field
                label="Label"
                value={k.label}
                onChange={(v) => listEdit('skills', i, 'label', v)}
              />
              <Field
                label="Skills"
                value={k.value}
                onChange={(v) => listEdit('skills', i, 'value', v)}
              />
            </Card>
          ))}
          <button style={btn} onClick={() => add('skills', { label: '', value: '' })}>Add skill row</button>
        </Section>

        <Section title="Experience">
          {cv.experience.map((e, i) => (
            <Card key={i} onRemove={() => remove('experience', i)}>
              <Field
                label="Job title"
                value={e.title}
                onChange={(v) => listEdit('experience', i, 'title', v)}
              />
              <Field
                label="Company"
                value={e.company}
                onChange={(v) => listEdit('experience', i, 'company', v)}
              />
              <Field
                label="Website"
                value={e.url}
                onChange={(v) => listEdit('experience', i, 'url', v)}
              />
              <Field
                label="Dates"
                value={e.dates}
                onChange={(v) => listEdit('experience', i, 'dates', v)}
              />
              <Field
                label="Bullets (one per line)"
                area
                rows={8}
                value={linesOf(e.bullets)}
                onChange={(v) => listEdit('experience', i, 'bullets', toLines(v))}
              />
            </Card>
          ))}
          <button style={btn} onClick={() => add('experience', { title: '', company: '', url: '', dates: '', bullets: [''] })}>
            Add job
          </button>
        </Section>

        <Section title="Projects">
          {cv.projects.map((p, i) => (
            <Card key={i} onRemove={() => remove('projects', i)}>
              <Field
                label="Project name"
                value={p.name}
                onChange={(v) => listEdit('projects', i, 'name', v)}
              />
              <Field
                label="Bullets (one per line)"
                area
                rows={5}
                value={linesOf(p.bullets)}
                onChange={(v) => listEdit('projects', i, 'bullets', toLines(v))}
              />
            </Card>
          ))}
          <button style={btn} onClick={() => add('projects', { name: '', bullets: [''] })}>
            Add project
          </button>
        </Section>

        <Section title="Education">
          {cv.education.map((e, i) => (
            <Card key={i} onRemove={() => remove('education', i)}>
              <Field
                label="Degree"
                value={e.degree}
                onChange={(v) => listEdit('education', i, 'degree', v)}
              />
              <Field
                label="Extra (e.g. CGPA)"
                value={e.extra}
                onChange={(v) => listEdit('education', i, 'extra', v)}
              />
              <Field
                label="Dates"
                value={e.dates}
                onChange={(v) => listEdit('education', i, 'dates', v)}
              />
              <Field
                label="School"
                value={e.school}
                onChange={(v) => listEdit('education', i, 'school', v)}
              />
            </Card>
          ))}
          <button style={btn} onClick={() => add('education', { degree: '', extra: '', dates: '', school: '' })}>
            Add education
          </button>
        </Section>

        <Section title="Certifications">
          {cv.certifications.map((c, i) => (
            <Card key={i} onRemove={() => remove('certifications', i)}>
              <Field
                label="Title"
                value={c.title}
                onChange={(v) => listEdit('certifications', i, 'title', v)}
              />
              <Field
                label="Dates"
                value={c.dates}
                onChange={(v) => listEdit('certifications', i, 'dates', v)}
              />
              <Field
                label="Issuer"
                value={c.issuer}
                onChange={(v) => listEdit('certifications', i, 'issuer', v)}
              />
              <label>
                <span style={{ display: 'block', fontFamily: 'system-ui, sans-serif', fontSize: 12, color: '#5b6472', margin: '8px 0 3px' }}>Icon preset</span>
                <select
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '6px 8px',
                    border: '1px solid #cfd5de',
                    borderRadius: 6,
                    font: '13px system-ui, sans-serif',
                    background: '#fff',
                  }}
                  value=""
                  onChange={(e) => e.target.value && edit((d) => { d.certifications[i].icon = ICONS[e.target.value]; })}
                >
                  <option value="">Choose a preset…</option>
                  {Object.keys(ICONS).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
              <Field
                label="Icon SVG code (optional)"
                area
                rows={3}
                value={c.icon || ''}
                onChange={(v) => listEdit('certifications', i, 'icon', v)}
              />
            </Card>
          ))}
          <button style={btn} onClick={() => add('certifications', { title: '', dates: '', issuer: '', icon: '' })}>
            Add certification
          </button>
        </Section>

        <Section title="Custom Sections">
          {cv.customSections?.map((sec, i) => (
            <Card key={i} onRemove={() => remove('customSections', i)}>
              <Field
                label="Section Title"
                value={sec.title}
                onChange={(v) => listEdit('customSections', i, 'title', v)}
              />
              <Field
                label="Content (paragraph)"
                area
                rows={3}
                value={sec.content || ''}
                onChange={(v) => listEdit('customSections', i, 'content', v)}
              />
              <Field
                label="Bullets (one per line)"
                area
                rows={5}
                value={linesOf(sec.bullets || [])}
                onChange={(v) => listEdit('customSections', i, 'bullets', toLines(v))}
              />
            </Card>
          ))}
          <button style={btn} onClick={() => add('customSections', { title: '', content: '', bullets: [] })}>
            Add custom section
          </button>
        </Section>

        <button
          style={{ ...btn, marginTop: 14 }}
          onClick={() => {
            if (confirm('Reset everything to the default CV?')) setCv(DEFAULT_CV);
          }}
        >
          Reset to default
        </button>
      </aside>

      <main className="cvb-stage">
        <div className="cvb-page"><Layout cv={cv} /></div>
      </main>
    </div>
  );
}