import _ from 'lodash';

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
  unchanged: () => [],
};
const formatToPlain = (diff, route = '') => {
  const decode = (node) => {
    const handle = plainMap[node.type];

    return handle(node, route, formatToPlain);
  };

  const plainedDiff = diff
    .flatMap(decode)
    .join('\n');

  return plainedDiff;
};


export default formatToPlain;
