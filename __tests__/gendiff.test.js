import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import ini from 'ini';
import makeDiff from '../src/diff.js';
import getParser from '../src/parsers.js';

console.log(getParser);

const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('parsers', () => {
  expect(getParser('__fixtures__/before.json', '__fixtures__/after.json')).toBe(JSON.parse);
  expect(getParser('__fixtures__/before.yml', '__fixtures__/after.yml')).toBe(yaml.safeLoad);
  expect(getParser('__fixtures__/before.ini', '__fixtures__/after.ini')).toBe(ini.parse);
});

test('gendiff', () => {
  expect(makeDiff('__fixtures__/before.json', '__fixtures__/after.json')).toBe(expected);
  expect(makeDiff('__fixtures__/before.yml', '__fixtures__/after.yml')).toBe(expected);
  expect(makeDiff('__fixtures__/before.ini', '__fixtures__/after.ini')).toBe(expected);
});
