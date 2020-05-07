import path from 'path';
import yaml from 'js-yaml';

const supportedExtensions = ['.json', '.yml'];

export default (filepath1, filepath2) => {
  const ext = path.extname(filepath1);
  const ext1 = path.extname(filepath2);

  if (!supportedExtensions.includes(ext) || !supportedExtensions.includes(ext1)) {
    throw new Error('Error: unsupported format');
  }

  if (ext !== ext1) {
    throw new Error('Error: file types must be equal');
  }

  let parser;

  if (ext === '.json') {
    parser = JSON.parse;
  } else if (ext === '.yml') {
    parser = yaml.safeLoad;
  }

  return parser;
};
