import fs from 'fs';
import buildDiff from './diff.js';
import parse from './parsers.js';
import convertToFormat from './formatters/index.js';

export default (filepath1, filepath2, format) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');

  const object1 = parse(data1, filepath1);
  const object2 = parse(data2, filepath2);

  const diff = buildDiff(object1, object2);
  const convertedDiff = convertToFormat(diff, format);

  return convertedDiff;
};
