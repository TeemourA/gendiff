import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (diff, format) => {
  if (!formatters[format]) {
    throw new Error(`${format} is not supported`);
  }

  const convertToFormat = formatters[format];

  return convertToFormat(diff);
};
