import { cleanSvg } from '../../utils';

/**
 * Renders user-supplied SVG markup (after sanitizing it) as an inline icon.
 * Renders nothing when the markup is empty or not an <svg>.
 */
export function SvgIcon({ svg }) {
  const safeSvg = cleanSvg(svg);
  if (!safeSvg) return null;
  return <span className="cvb-ico" dangerouslySetInnerHTML={{ __html: safeSvg }} />;
}
