import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';


const getPath = (filename) => (
  path.join('.', '__fixtures__', filename)
);

const output = {
  stylish: fs.readFileSync('./__fixtures__/resultStylishOutput.txt', 'utf-8'),
  plain: fs.readFileSync('./__fixtures__/resultPlainOutput.txt', 'utf-8'),
  json: fs.readFileSync('./__fixtures__/resultJsonOutput.txt', 'utf-8'),
};

describe.each`
  ext
  ${'.json'}
  ${'.yml'}
  ${'.ini'}
`('gendiff for $ext files', ({ ext }) => {
  const before = getPath(`before${ext}`);
  const after = getPath(`after${ext}`);

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
