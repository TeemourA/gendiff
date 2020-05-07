import _ from 'lodash';
import fs from 'fs';
import getParser from './parsers.js';

export default (filepath1, filepath2) => {
  const parse = getParser(filepath1, filepath2);

  const objectFile1 = parse(fs.readFileSync(filepath1, 'utf-8'));
  const objectFile2 = parse(fs.readFileSync(filepath2, 'utf-8'));

  const fileEntries1 = Object.entries(objectFile1);
  const fileEntries2 = Object.entries(objectFile2);

  const keys = _.uniq(fileEntries1.concat(fileEntries2).map(([key]) => key));

  const compare = (acc, key) => {
    if (_.has(objectFile1, key) && _.has(objectFile2, key)) {
      if (objectFile1[key] === objectFile2[key]) {
        acc.push(`    ${key}: ${objectFile1[key]}`);
      } else {
        acc.push(`  + ${key}: ${objectFile2[key]}`);
        acc.push(`  - ${key}: ${objectFile1[key]}`);
      }
    } else if (!_.has(objectFile1, key) && _.has(objectFile2, key)) {
      acc.push(`  + ${key}: ${objectFile2[key]}`);
    } else if (_.has(objectFile1, key) && !_.has(objectFile2, key)) {
      acc.push(`  - ${key}: ${objectFile1[key]}`);
    }

    return acc;
  };

  const result = `{\n${keys.reduce(compare, []).join('\n')}\n}`;


  return result;
};
