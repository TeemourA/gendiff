import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const supportedExtensions = ['.json', '.yml', '.ini'];
const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (filepath1, filepath2) => {
  const ext = path.extname(filepath1);
  const ext1 = path.extname(filepath2);

  if (!supportedExtensions.includes(ext) || !supportedExtensions.includes(ext1)) {
    throw new Error('Unsupported format');
  }

  if (ext !== ext1) {
    throw new Error('File types must be equal');
  }

  const parser = parsers[ext];

  return parser;
};
