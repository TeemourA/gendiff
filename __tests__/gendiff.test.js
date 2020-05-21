import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import genDiff from '../src/index.js';
import getParser from '../src/parsers.js';


const paths = {
  before: {
    '.json': './__fixtures__/before.json',
    '.yml': './__fixtures__/before.yml',
    '.ini': './__fixtures__/before.ini',
  },
  after: {
    '.json': './__fixtures__/after.json',
    '.yml': './__fixtures__/after.yml',
    '.ini': './__fixtures__/after.ini',
  },
};

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const output = {
  stylish: fs.readFileSync('./__fixtures__/stylish.txt', 'utf-8'),
  plain: fs.readFileSync('./__fixtures__/plain.txt', 'utf-8'),
  json: fs.readFileSync('./__fixtures__/json.txt', 'utf-8'),
};

describe.each`
  ext
  ${'.json'}
  ${'.yml'}
  ${'.ini'}
`('gendiff for $ext files', ({ ext }) => {
  const before = paths.before[ext];
  const after = paths.after[ext];

  test('parser', () => {
    expect(getParser(before, after)).toBe(parsers[ext]);
  });

  test('formatter [stylish]', () => {
    expect(genDiff(before, after, 'stylish')).toBe(output.stylish);
  });

  test('formatter [plain]', () => {
    expect(genDiff(before, after, 'plain')).toBe(output.plain);
  });

  test('formatter [json]', () => {
    expect(genDiff(before, after, 'json')).toBe(output.json);
  });
});
