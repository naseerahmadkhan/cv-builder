/**
 * Sanitize user-supplied SVG markup before it is injected as HTML.
 * Returns '' when the input is not an <svg> element.
 *
 * Strips scripts, foreignObject, inline event handlers, javascript: URLs and
 * the fixed width/height on the root <svg> tag (the icon is sized by CSS instead).
 * Child shapes keep their width/height, e.g. <rect width="20" height="16">.
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
    .replace(/^<svg[^>]*>/i, (rootTag) =>
      rootTag.replace(/\s(width|height)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, ''),
    );
}
