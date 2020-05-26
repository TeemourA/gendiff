import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';
import path from 'path';

const normalizeValue = (value) => {
  const isNumber = (typeof value === 'string') && Number(value);
  return isNumber ? Number(value) : undefined;
};

const parseIni = (data) => {
  const object = ini.parse(data);
  const normalizedObject = _.cloneDeepWith(object, normalizeValue);
  return normalizedObject;
};

const normalizeFormat = (filename) => {
  const format = path.extname(filename).slice(1);

  return format === 'yml' ? 'yaml' : format;
};

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: parseIni,
};

export default (data, format) => {
  const normalizedFormat = normalizeFormat(format);

  if (!parsers[normalizedFormat]) {
    throw new Error('Unsupported format');
  }

  const parse = parsers[normalizedFormat];

  return parse(data);
};
