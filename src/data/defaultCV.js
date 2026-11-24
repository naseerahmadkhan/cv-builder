import { ICONS } from './icons.js';
import { DEFAULT_STYLE } from './constants.js';
import defaultCVJson from './defaultCV.json' with { type: 'json' };

/**
 * Map icon name strings (e.g., "Phone") to their actual SVG markup.
 * The defaultCV.json stores icon names; we swap them for the real SVG at load time.
 */
function mapIcons(cv) {
  const iconMap = {
    Phone: ICONS.Phone,
    Email: ICONS.Email,
    LinkedIn: ICONS.LinkedIn,
    GitHub: ICONS.GitHub,
    Website: ICONS.Website,
    Location: ICONS.Location,
  };

  if (cv.header?.contacts) {
    cv.header.contacts = cv.header.contacts.map((c) => {
      const matched = Object.entries(iconMap).find(([, svg]) => svg === c.icon);
      return matched ? { ...c, icon: matched[1] } : c;
    });
  }
  return cv;
}

/**
 * Merge the JSON defaults with DEFAULT_STYLE constants so there's a single source of truth.
 * This ensures the UI dropdowns and the preview always share the same default values.
 */
const baseCV = mapIcons(defaultCVJson);
export const DEFAULT_CV = {
  ...baseCV,
  style: { ...DEFAULT_STYLE, ...baseCV.style },
};