import { ICONS } from './icons.js';
import defaultCVJson from './defaultCV.json' with { type: 'json' };

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

export const DEFAULT_CV = mapIcons(defaultCVJson);