import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import ini from 'ini';
import genDiff from '../src/index.js';
import getParser from '../src/parsers.js';

console.log(getParser);

const expected = {
  plain: `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  deep: `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`,
};

const fixtures = {
  before: {
    json: './__fixtures__/deepBefore.json',
    yaml: './__fixtures__/deepBefore.yml',
    ini: './__fixtures__/deepBefore.ini',
  },
  after: {
    json: './__fixtures__/deepAfter.json',
    yaml: './__fixtures__/deepAfter.yml',
    ini: './__fixtures__/deepAfter.ini',
  },
};

test('parsers', () => {
  expect(getParser(fixtures.before.json, fixtures.after.json)).toBe(JSON.parse);
  expect(getParser(fixtures.before.yaml, fixtures.after.yaml)).toBe(yaml.safeLoad);
  expect(getParser(fixtures.before.ini, fixtures.after.ini)).toBe(ini.parse);
});

test('gendiff [stylish]', () => {
  expect(genDiff(fixtures.before.json, fixtures.after.json, 'stylish')).toBe(expected.deep);
  expect(genDiff(fixtures.before.yaml, fixtures.after.yaml, 'stylish')).toBe(expected.deep);
  expect(genDiff(fixtures.before.ini, fixtures.after.ini, 'stylish')).toBe(expected.deep);
});
