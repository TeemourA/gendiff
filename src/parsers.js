import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const normalizeValue = (value) => {
  const isNumber = (typeof value === 'string') && Number(value);
  return isNumber ? Number(value) : undefined;
};

const parseIni = (data) => {
  const object = ini.parse(data);
  const normalizedObject = _.cloneDeepWith(object, normalizeValue);
  return normalizedObject;
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (data, format) => {
  if (!parsers[format]) {
    throw new Error('Unsupported format');
  }

  const parse = parsers[format];

  return parse(data);
};
