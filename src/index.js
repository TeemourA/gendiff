import fs from 'fs';
import path from 'path';
import buildDiff from './diff.js';
import parse from './parsers.js';
import convertToFormat from './formatters/index.js';

const getFileExt = (filepath) => {
  const ext = path.extname(filepath).slice(1);

  return ext === 'yml' ? 'yaml' : ext;
};

export default (filepath1, filepath2, format) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');

  const objectFile1 = parse(data1, getFileExt(filepath1));
  const objectFile2 = parse(data2, getFileExt(filepath2));

  const diff = buildDiff(objectFile1, objectFile2);
  const converted = convertToFormat(diff, format);

  return converted;
};
