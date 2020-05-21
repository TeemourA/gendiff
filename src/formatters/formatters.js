import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const supportedFormats = ['stylish', 'plain', 'json'];
const formatters = {
  stylish,
  plain,
  json,
};

export default (format) => {
  if (!supportedFormats.includes(format)) {
    throw new Error(`${format} is not supported`);
  }

  return formatters[format];
};
