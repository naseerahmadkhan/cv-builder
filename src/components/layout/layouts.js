import ClassicLayout from './ClassicLayout.jsx';

/**
 * Registry of available CV layouts, keyed by the value stored in `cv.layout`.
 * To add a layout: create its component and add an entry here; it shows up
 * in the Layout dropdown automatically.
 */
export const LAYOUTS = {
  classic: {
    label: 'Classic (dark header)',
    Component: ClassicLayout,
  },
};
