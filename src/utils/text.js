/** Join a list of strings into textarea content (one item per line). */
export const linesOf = (items = []) => items.join('\n');

/** Split textarea content back into a list (one item per line). */
export const toLines = (text) => text.split('\n');
