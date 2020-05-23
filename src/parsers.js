import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const iniParse = (data) => {
  const normalizeValue = (value) => {
    const isNumber = (typeof value === 'string') && Number(value);
    return isNumber ? Number(value) : undefined;
  };

  const object = ini.parse(data);
  const normalizedObject = _.cloneDeepWith(object, normalizeValue);
  return normalizedObject;
};

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: iniParse,
};

const isNotSupported = (ext) => parsers[ext] === undefined;

export default (data, ext) => {
  if (isNotSupported(ext)) {
    throw new Error('Unsupported format');
  }

  const parse = parsers[ext];

  return parse(data);
};
