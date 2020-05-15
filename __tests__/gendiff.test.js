import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import ini from 'ini';
import genDiff from '../src/index.js';
import getParser from '../src/parsers.js';

console.log(getParser);

const expected = {
  stylish: `{
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
  plain: `Property 'common.setting2' was deleted
Property 'common.setting3' was changed from 'true' to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: 'false'
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from [complex value] to 'str'
Property 'group2' was deleted
Property 'group3' was added with value: [complex value]`,
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
  expect(genDiff(fixtures.before.json, fixtures.after.json, 'stylish')).toBe(expected.stylish);
  expect(genDiff(fixtures.before.yaml, fixtures.after.yaml, 'stylish')).toBe(expected.stylish);
  expect(genDiff(fixtures.before.ini, fixtures.after.ini, 'stylish')).toBe(expected.stylish);
});

test(('gendiff [plain]'), () => {
  expect(genDiff(fixtures.before.json, fixtures.after.json, 'plain')).toBe(expected.plain);
  expect(genDiff(fixtures.before.yaml, fixtures.after.yaml, 'plain')).toBe(expected.plain);
  expect(genDiff(fixtures.before.ini, fixtures.after.ini, 'plain')).toBe(expected.plain);
});
