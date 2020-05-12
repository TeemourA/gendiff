import fs from 'fs';
import buildDiff from './diff.js';
import getParser from './parsers.js';
import getFormatter from './formatters/formatters.js';

export default (filepath1, filepath2, format) => {
  const toFormat = getFormatter(format);
  const parse = getParser(filepath1, filepath2);

  const objectFile1 = parse(fs.readFileSync(filepath1, 'utf-8'));
  const objectFile2 = parse(fs.readFileSync(filepath2, 'utf-8'));

  const diff = buildDiff(objectFile1, objectFile2);

  return toFormat(diff);
};
