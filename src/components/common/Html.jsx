/**
 * Renders a string that may contain inline HTML (bold text, links...).
 * CV text is written by the person editing their own CV, so it is trusted;
 * only SVG icons are sanitized (see SvgIcon).
 *
 * @param {string} html
 * @param {keyof JSX.IntrinsicElements} [as] - Wrapper element
 */
export function Html({ html, as: Tag = 'span', ...props }) {
  return <Tag dangerouslySetInnerHTML={{ __html: html }} {...props} />;
}

/** Renders each line of a multi-line string as its own <Html> span. */
export function HtmlLines({ text }) {
  return text.split('\n').map((line, index) => <Html key={index} html={line} />);
}
