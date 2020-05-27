import formatToStylish from './stylish.js';
import formatToPlain from './plain.js';
import formatToJson from './json.js';

const formatters = {
  stylish: formatToStylish,
  plain: formatToPlain,
  json: formatToJson,
};

export default (diff, format) => {
  if (!formatters[format]) {
    throw new Error(`${format} is not supported`);
  }

  const convertToFormat = formatters[format];

  return convertToFormat(diff);
};
