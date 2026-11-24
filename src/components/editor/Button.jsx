import { buttonStyle, primaryButtonStyle, smallButtonStyle } from './styles.js';

const VARIANT_STYLES = {
  default: buttonStyle,
  primary: primaryButtonStyle,
  small: smallButtonStyle,
};

/**
 * Editor button.
 * @param {'default'|'primary'|'small'} [variant]
 */
export function Button({ variant = 'default', style, children, ...props }) {
  return (
    <button type="button" style={{ ...VARIANT_STYLES[variant], ...style }} {...props}>
      {children}
    </button>
  );
}
