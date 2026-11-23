/* Pasted SVG is rendered as HTML, so strip anything that can run code. */
export function cleanSvg(str = '') {
  const t = str.trim();
  if (!/^<svg[\s>]/i.test(t)) return '';
  return t
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '');
}

export function linesOf(arr) {
  return arr.join('\n');
}

export function toLines(str) {
  return str.split('\n');
}

/* Fill in any keys missing from an older/partial JSON file. */
export function merge(data, DEFAULT_CV, ICONS) {
  const h = data.header || {};
  let contacts = h.contacts;
  if (!Array.isArray(contacts)) {
    // older files stored phone / email / linkedin as plain fields
    contacts = [
      h.phone && { icon: ICONS.Phone, text: h.phone },
      h.email && { icon: ICONS.Email, text: h.email },
      h.linkedin && { icon: ICONS.LinkedIn, text: h.linkedin },
    ].filter(Boolean);
    if (!contacts.length) contacts = DEFAULT_CV.header.contacts;
  }
  return {
    ...DEFAULT_CV,
    ...data,
    style: { ...DEFAULT_CV.style, ...(data.style || {}) },
    header: { name: h.name ?? DEFAULT_CV.header.name, contacts },
    customSections: data.customSections ?? DEFAULT_CV.customSections ?? [],
  };
}