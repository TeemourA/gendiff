import _ from 'lodash';

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
  added: (node) => {
    const indent = getIndentWithSign(getIndent(node.depth), '+');
    const value = formatValue(node.value, node.depth);

    return `${indent}${node.key}: ${value}`;
  },
  deleted: (node) => {
    const indent = getIndentWithSign(getIndent(node.depth), '-');
    const value = formatValue(node.value, node.depth);

    return `${indent}${node.key}: ${value}`;
  },
  changed: (node) => {
    const oldValueIndent = getIndentWithSign(getIndent(node.depth), '-');
    const newValueIndent = getIndentWithSign(getIndent(node.depth), '+');

    const oldValue = formatValue(node.oldVal, node.depth);
    const newValue = formatValue(node.newVal, node.depth);

    return [
      `${oldValueIndent}${node.key}: ${oldValue}`,
      `${newValueIndent}${node.key}: ${newValue}`,
    ];
  },
  unchanged: (node) => {
    const indent = getIndent(node.depth);
    const value = formatValue(node.value, node.depth);

    return `${indent}${node.key}: ${value}`;
  },
  nested: (node, formatToStylish) => {
    const indent = getIndent(node.depth);
    const children = formatToStylish(node.children, node.depth + 1);

    return `${indent}${node.key}: ${children}`;
  },
};

const formatToStylish = (diff, depth) => {
  const decode = (node) => {
    if (!_.has(stylishMap, node.type)) {
      throw new Error(`${node.type} - unexpected node type`);
    }

    const handle = stylishMap[node.type];

    return node.type === 'nested' ? handle(node, formatToStylish) : handle(node);
  };
  const styledDiff = diff
    .flatMap((node) => decode(node))
    .join('\n');

  return makeWrapped(styledDiff, depth);
};

export default formatToStylish;
