import { DEFAULT_CV } from '../data/defaultCV.js';
import { ICONS } from '../data/icons.js';

/**
 * Older files stored phone, email and linkedin as plain header fields.
 * Convert them to the current `contacts` list; fall back to the default
 * contacts when the header has none of them.
 */
function legacyContacts(header) {
  const contacts = [
    header.phone && { icon: ICONS.Phone, text: header.phone },
    header.email && { icon: ICONS.Email, text: header.email },
    header.linkedin && { icon: ICONS.LinkedIn, text: header.linkedin },
  ].filter(Boolean);

  return contacts.length ? contacts : DEFAULT_CV.header.contacts;
}

/**
 * Fill in any keys missing from an older or partial CV (loaded from
 * localStorage or a JSON file) using the defaults.
 *
 * @param {object} data - Raw CV data
 * @returns {object} Complete CV object
 */
export function mergeWithDefaults(data) {
  const header = data.header || {};
  const contacts = Array.isArray(header.contacts) ? header.contacts : legacyContacts(header);

  return {
    ...DEFAULT_CV,
    ...data,
    style: { ...DEFAULT_CV.style, ...data.style },
    header: { name: header.name ?? DEFAULT_CV.header.name, contacts },
    sectionIcons: { ...DEFAULT_CV.sectionIcons, ...data.sectionIcons },
    customSections: data.customSections ?? DEFAULT_CV.customSections ?? [],
  };
}

/**
 * Set a value deep inside an object, mutating it.
 * Meant to be used on a cloned draft, e.g. setIn(draft, ['skills', 0, 'label'], 'Web').
 *
 * @param {object} target
 * @param {Array<string|number>} path
 * @param {*} value
 */
export function setIn(target, path, value) {
  const parent = path.slice(0, -1).reduce((node, key) => node[key], target);
  parent[path[path.length - 1]] = value;
}

/** Read a list (or object) deep inside an object by path. */
export function getIn(target, path) {
  return path.reduce((node, key) => node[key], target);
}
