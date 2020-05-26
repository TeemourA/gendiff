import _ from 'lodash';

const removeUnchangedNodes = (node) => node.type !== 'unchanged';

const calculateRoute = (route, node) => (route === '' ? `${node.key}` : `${route}.${node.key}`);

const formatValue = (value) => (_.isPlainObject(value) ? '[complex value]' : `'${value}'`);

const plainMap = {
  added: (node, route) => {
    const currentRoute = calculateRoute(route, node);
    const value = formatValue(node.value);

    return `Property '${currentRoute}' was added with value: ${value}`;
  },
  deleted: (node, route) => {
    const currentRoute = calculateRoute(route, node);

    return `Property '${currentRoute}' was deleted`;
  },
  changed: (node, route) => {
    const currentRoute = calculateRoute(route, node);

    const oldValue = formatValue(node.oldVal);
    const newValue = formatValue(node.newVal);

    return `Property '${currentRoute}' was changed from ${oldValue} to ${newValue}`;
  },
  nested: (node, route, formatToPlain) => {
    const currentRoute = calculateRoute(route, node);
    const { children } = node;

    return formatToPlain(children, currentRoute);
  },
};
const formatToPlain = (diff, route = '') => {
  const decode = (node) => {
    if (!_.has(plainMap, node.type)) {
      throw new Error(`${node.type} - unexpected node type`);
    }

    const handler = plainMap[node.type];

    return node.type === 'nested' ? handler(node, route, formatToPlain) : handler(node, route);
  };

  const plainedDiff = diff
    .filter(removeUnchangedNodes)
    .map(decode)
    .join('\n');

  return plainedDiff;
};


export default formatToPlain;
