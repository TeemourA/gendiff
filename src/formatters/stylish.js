import _ from 'lodash';

const initialDepth = 1;

const signs = {
  added: '+',
  deleted: '-',
};

const wrappers = {
  curly: {
    opening: '{',
    closing: '}',
  },
};

const getIndent = (depth, sign = null) => {
  const indentSize = 4;
  const currentIndent = ' '.repeat(indentSize * depth);

  return sign === null ? currentIndent : `${currentIndent.slice(2)}${sign} `;
};

const makeWrapped = (value, depth, wrapper = wrappers.curly) => {
  const closingWrapperIndent = getIndent(depth - 1);
  const wrappedValue = `${wrapper.opening}\n${value}\n${closingWrapperIndent}${wrapper.closing}`;

  return wrappedValue;
};

const formatObject = (object, depth) => {
  const indent = getIndent(depth + 1);
  const formattedObject = Object.entries(object)
    .map(([key, value]) => `${indent}${key}: ${value}`)
    .join('\n');

  return makeWrapped(formattedObject, depth + 1);
};

const formatValue = (value, currentDepth) => (
  _.isPlainObject(value) ? formatObject(value, currentDepth) : value
);

const toStylish = (diff, depth = initialDepth) => {
  const iter = (node) => {
    switch (node.type) {
      case 'added': {
        const indent = getIndent(depth, signs.added);
        const value = formatValue(node.value, depth);

        return `${indent}${node.key}: ${value}`;
      }
      case 'deleted': {
        const indent = getIndent(depth, signs.deleted);
        const value = formatValue(node.value, depth);

        return `${indent}${node.key}: ${value}`;
      }
      case 'changed': {
        const oldValueIndent = getIndent(depth, signs.deleted);
        const newValueIndent = getIndent(depth, signs.added);

        const oldValue = formatValue(node.oldVal, depth);
        const newValue = formatValue(node.newVal, depth);

        return [
          `${oldValueIndent}${node.key}: ${oldValue}`,
          `${newValueIndent}${node.key}: ${newValue}`,
        ];
      }
      case 'unchanged': {
        const indent = getIndent(depth);
        const value = formatValue(node.value, depth);

        return `${indent}${node.key}: ${value}`;
      }
      case 'nested': {
        const indent = getIndent(depth);
        const children = toStylish(node.children, depth + 1);

        return `${indent}${node.key}: ${children}`;
      }
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  };

  const styledDiff = diff
    .flatMap((node) => iter(node))
    .join('\n');

  return makeWrapped(styledDiff, depth);
};

export default toStylish;
