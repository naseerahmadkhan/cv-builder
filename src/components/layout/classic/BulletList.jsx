import { CLASSIC_LAYOUT as L } from '../../../constants';
import { Html } from '../../common';

/**
 * Bulleted list whose items may contain inline HTML.
 * @param {string[]} items
 * @param {boolean} [nested] - Use hollow bullets (list inside another list item)
 */
export function BulletList({ items, nested = false }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: L.listIndent,
        listStyle: nested ? 'circle' : 'disc',
        lineHeight: L.listLineHeight,
      }}
    >
      {items.map((item, index) => (
        <Html key={index} as="li" html={item} className="cvb-avoid-break" />
      ))}
    </ul>
  );
}
