import { DEFAULT_STYLE } from '../constants';
import defaultCVJson from './defaultCV.json';

/**
 * The CV loaded on first run and after "Reset to default".
 *
 * Content comes from defaultCV.json. The style block is layered on top of
 * DEFAULT_STYLE so a style key missing from the JSON still gets a sane value.
 */
export const DEFAULT_CV = {
  ...defaultCVJson,
  style: { ...DEFAULT_STYLE, ...defaultCVJson.style },
};
