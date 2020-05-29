import _ from 'lodash';

const initialDepth = 0;
const initialIndent = '    ';

const getIndent = (depth) => {
  const indent = initialIndent.repeat(depth);

  return indent;
};

const makeWrapped = (value, depth) => {
  const closingWrapperIndent = getIndent(depth);
  const wrappedValue = `{\n${value}\n${closingWrapperIndent}}`;

  return wrappedValue;
};

const formatObject = (object, depth) => {
  const indent = getIndent(depth + 1);
  const formattedObject = Object.entries(object)
    .map(([key, value]) => `${indent}    ${key}: ${value}`)
    .join('\n');

  return makeWrapped(formattedObject, depth + 1);
};

const formatValue = (value, currentDepth) => (
  _.isPlainObject(value) ? formatObject(value, currentDepth) : value
);

const stylishMap = {
  added: (node, depth) => {
    const indent = getIndent(depth);
    const value = formatValue(node.value, depth);

    return `${indent}  + ${node.key}: ${value}`;
  },
  deleted: (node, depth) => {
    const indent = getIndent(depth);
    const value = formatValue(node.value, depth);

    return `${indent}  - ${node.key}: ${value}`;
  },
  changed: (node, depth) => {
    const indent = getIndent(depth);

    const oldValue = formatValue(node.oldVal, depth);
    const newValue = formatValue(node.newVal, depth);

    return [
      `${indent}  - ${node.key}: ${oldValue}`,
      `${indent}  + ${node.key}: ${newValue}`,
    ];
  },
  unchanged: (node, depth) => {
    const indent = getIndent(depth);
    const value = formatValue(node.value, depth);

    return `${indent}    ${node.key}: ${value}`;
  },
  nested: (node, depth, formatToStylish) => {
    const indent = getIndent(depth);
    const children = formatToStylish(node.children, depth + 1);

    return `${indent}    ${node.key}: ${children}`;
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
