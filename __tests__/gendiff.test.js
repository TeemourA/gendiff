import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const inputFormats = ['json', 'yml', 'ini'];

const getPath = (filename, format) => (
  path.join('.', '__fixtures__', `${filename}.${format}`)
);

let output;

beforeAll(() => {
  output = {
    stylish: fs.readFileSync(getPath('result-stylish-output', 'txt'), 'utf-8'),
    plain: fs.readFileSync(getPath('result-plain-output', 'txt'), 'utf-8'),
    json: fs.readFileSync(getPath('result-json-output', 'txt'), 'utf-8'),
  };
});

describe.each(inputFormats)('gendiff for format files', (format) => {
  const before = getPath('before', format);
  const after = getPath('after', format);

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
