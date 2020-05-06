import { test, expect } from '@jest/globals';
import makeJsonDiff from '../src/jsonDiff.js';

const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

test('gendiff JSON', () => {
    expect(makeJsonDiff('../before.json', '../after.json')).toBe(expected);
});