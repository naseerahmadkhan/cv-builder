/**
 * Sanitize user-supplied SVG markup before it is injected as HTML.
 * Returns '' when the input is not an <svg> element.
 *
 * Strips scripts, foreignObject, inline event handlers, javascript: URLs and
 * fixed width/height (the icon is sized by CSS instead).
 *
 * @param {string} [markup]
 * @returns {string}
 */
export function cleanSvg(markup = '') {
  const trimmed = markup.trim();
  if (!/^<svg[\s>]/i.test(trimmed)) return '';

  return trimmed
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/\s(width|height)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
}
