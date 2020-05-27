import _ from 'lodash';

const initialDepth = 1;

const getIndent = (depth) => {
  const indentSize = 4;
  const indent = ' '.repeat(indentSize * depth);

  return indent;
};

const getIndentWithSign = (indent, sign) => (`${indent.slice(2)}${sign} `);

const makeWrapped = (value, depth) => {
  const closingWrapperIndent = getIndent(depth - 1);
  const wrappedValue = `{\n${value}\n${closingWrapperIndent}}`;

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

const stylishMap = {
  added: (node, depth) => {
    const indent = getIndentWithSign(getIndent(depth), '+');
    const value = formatValue(node.value, depth);

    return `${indent}${node.key}: ${value}`;
  },
  deleted: (node, depth) => {
    const indent = getIndentWithSign(getIndent(depth), '-');
    const value = formatValue(node.value, depth);

    return `${indent}${node.key}: ${value}`;
  },
  changed: (node, depth) => {
    const oldValueIndent = getIndentWithSign(getIndent(depth), '-');
    const newValueIndent = getIndentWithSign(getIndent(depth), '+');

    const oldValue = formatValue(node.oldVal, depth);
    const newValue = formatValue(node.newVal, depth);

    return [
      `${oldValueIndent}${node.key}: ${oldValue}`,
      `${newValueIndent}${node.key}: ${newValue}`,
    ];
  },
  unchanged: (node, depth) => {
    const indent = getIndent(depth);
    const value = formatValue(node.value, depth);

    return `${indent}${node.key}: ${value}`;
  },
  nested: (node, depth, formatToStylish) => {
    const indent = getIndent(depth);
    const children = formatToStylish(node.children, depth + 1);

    return `${indent}${node.key}: ${children}`;
  },
};

const formatToStylish = (diff, depth = initialDepth) => {
  const decode = (node) => {
    const handle = stylishMap[node.type];

    return handle(node, depth, formatToStylish);
  };
  const styledDiff = diff
    .flatMap(decode)
    .join('\n');

  return makeWrapped(styledDiff, depth);
};

export default formatToStylish;
