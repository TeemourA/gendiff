import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import ini from 'ini';
import genDiff from '../src/index.js';
import getParser from '../src/parsers.js';
import { getExpected, getFixtures } from '../__fixtures__/data.js';

const expected = getExpected();
const fixtures = getFixtures();

test('parsers', () => {
  expect(getParser(fixtures.before.json, fixtures.after.json)).toBe(JSON.parse);
  expect(getParser(fixtures.before.yaml, fixtures.after.yaml)).toBe(yaml.safeLoad);
  expect(getParser(fixtures.before.ini, fixtures.after.ini)).toBe(ini.parse);
});

test('gendiff [stylish]', () => {
  expect(genDiff(fixtures.before.json, fixtures.after.json, 'stylish')).toBe(expected.stylish);
  expect(genDiff(fixtures.before.yaml, fixtures.after.yaml, 'stylish')).toBe(expected.stylish);
  expect(genDiff(fixtures.before.ini, fixtures.after.ini, 'stylish')).toBe(expected.stylish);
});

test(('gendiff [plain]'), () => {
  expect(genDiff(fixtures.before.json, fixtures.after.json, 'plain')).toBe(expected.plain);
  expect(genDiff(fixtures.before.yaml, fixtures.after.yaml, 'plain')).toBe(expected.plain);
  expect(genDiff(fixtures.before.ini, fixtures.after.ini, 'plain')).toBe(expected.plain);
});

test(('gendiff [json]'), () => {
  expect(genDiff(fixtures.before.json, fixtures.after.json, 'json')).toBe(expected.json);
  expect(genDiff(fixtures.before.yaml, fixtures.after.yaml, 'json')).toBe(expected.json);
  expect(genDiff(fixtures.before.ini, fixtures.after.ini, 'json')).toBe(expected.json);
});
