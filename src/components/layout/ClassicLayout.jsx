import { cleanSvg } from '../../utils/helpers.js';

function H({ children, mt = 14, s }) {
  return (
    <h2
      style={{
        margin: `${mt}px 0 6px`,
        color: s.accent,
        fontSize: `${s.headingSize}pt`,
        fontWeight: 700,
        breakAfter: 'avoid',
      }}
    >
      {children}
    </h2>
  );
}

function Bullets({ items, sub }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: '6mm',
        listStyle: sub ? 'circle' : 'disc',
        lineHeight: 1.45,
      }}
    >
      {items.map((b, i) => (
        <li key={i} style={{ breakInside: 'avoid' }} dangerouslySetInnerHTML={{ __html: b }} />
      ))}
    </ul>
  );
}

function Block({ rows }) {
  return (
    <div
      style={{
        fontWeight: 700,
        lineHeight: 1.5,
        marginBottom: 6,
        breakInside: 'avoid',
      }}
    >
      {rows.map((r, i) => r && (
        <div key={i} dangerouslySetInnerHTML={{ __html: r }} />
      ))}
    </div>
  );
}

export default function ClassicLayout({ cv }) {
  const s = cv.style;
  const pt = (n) => `${n}pt`;
  const MARGIN = '0 16mm';

  return (
    <div style={{ fontFamily: s.font, fontSize: pt(s.baseSize), color: s.textColor, paddingBottom: '10mm' }}>
      <div
        style={{
          background: s.headerBg,
          color: s.headerText,
          textAlign: 'center',
          padding: '10mm 8mm 7mm',
        }}
      >
        <div style={{ fontSize: pt(s.nameSize), fontWeight: 700, lineHeight: 1.2 }}>
          {cv.header.name}
        </div>
        <div
          style={{
            fontSize: pt(s.baseSize + 1),
            marginTop: 6,
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2mm 8mm',
          }}
        >
          {cv.header.contacts.map((c, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              {cleanSvg(c.icon) && (
                <span className="cvb-ico" dangerouslySetInnerHTML={{ __html: cleanSvg(c.icon) }} />
              )}
              {c.text}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: MARGIN, paddingTop: '9mm' }}>
        {cv.summary && (
          <>
            <H mt={0} s={s}>Summary</H>
            <p
              style={{
                margin: 0,
                paddingBottom: 8,
                lineHeight: 1.5,
                borderBottom: `1.5px solid ${s.ruleColor}`,
              }}
            >
              {cv.summary.split('\n').map((line, idx) => (
                <span key={idx} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </p>
          </>
        )}

        {cv.skills.length > 0 && (
          <>
            <H s={s}>Skills</H>
            <table style={{ borderCollapse: 'collapse', lineHeight: 1.5 }}>
              <tbody>
                {cv.skills.map((k, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        padding: 0,
                        fontWeight: 700,
                        fontSize: pt(s.baseSize + 1),
                        paddingRight: '6mm',
                        verticalAlign: 'top',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {k.label}
                    </td>
                    <td style={{ padding: 0 }}>{k.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {cv.experience.length > 0 && <H s={s}>Experience</H>}
        {cv.experience.map((e, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <Block s={s} rows={[e.title, e.company, e.url, e.dates]} />
            <Bullets s={s} items={e.bullets} />
          </div>
        ))}

        {cv.projects.length > 0 && (
          <div style={{ breakBefore: s.pageBreakBeforeProjects ? 'page' : 'auto' }}>
            <H mt={s.pageBreakBeforeProjects ? 0 : 14} s={s}>
              Projects
            </H>
            <ul style={{ margin: 0, paddingLeft: '6mm', lineHeight: 1.45 }}>
              {cv.projects.map((p, i) => (
                <li key={i} style={{ breakInside: 'avoid' }}>
                  {p.name}
                  <Bullets s={s} items={p.bullets} sub />
                </li>
              ))}
            </ul>
          </div>
        )}

        {cv.education.length > 0 && <H s={s}>Education</H>}
        {cv.education.map((e, i) => (
          <Block
            key={i}
            s={s}
            rows={[e.extra ? `${e.degree}      ${e.extra}` : e.degree, e.dates, e.school]}
          />
        ))}

        {cv.certifications.length > 0 && <H s={s}>Certifications</H>}
        {cv.certifications.map((c, i) => (
          <Block key={i} s={s} rows={[c.title, c.dates, c.issuer]} />
        ))}

        {cv.customSections?.map((section, i) => (
          <div key={i} style={{ marginTop: 14 }}>
            <H s={s}>{section.title}</H>
            {section.content && (
              <p style={{ margin: '0 0 8px', lineHeight: 1.5 }}>
                {section.content.split('\n').map((line, idx) => (
                  <span key={idx} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </p>
            )}
            {section.bullets?.length > 0 && (
              <Bullets items={section.bullets} />
            )}
            {section.items?.map((item, j) => (
              <Block key={j} rows={item.rows} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}