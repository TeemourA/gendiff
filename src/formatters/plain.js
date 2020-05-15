import _ from 'lodash';

const removeUnchanged = (diff) => {
  const filtered = diff.filter((node) => node.type !== 'unchanged');

  return filtered;
};

const calculateRoute = (route, node) => (route === '' ? `${node.key}` : `${route}.${node.key}`);

const formatValue = (value) => (_.isPlainObject(value) ? '[complex value]' : `'${value}'`);

const toPlain = (diff, route = '') => {
  const decode = (node) => {
    const currentRoute = calculateRoute(route, node);

    switch (node.type) {
      case 'added': {
        const value = formatValue(node.value);

        return `Property '${currentRoute}' was added with value: ${value}`;
      }
      case 'deleted':
        return `Property '${currentRoute}' was deleted`;
      case 'changed': {
        const oldValue = formatValue(node.oldVal);
        const newValue = formatValue(node.newVal);

        return `Property '${currentRoute}' was changed from ${oldValue} to ${newValue}`;
      }
      case 'nested': {
        const { children } = node;

        return toPlain(children, currentRoute);
      }
      default:
        throw new Error(`${node.type} - unexpected node type`);
    }
  };

  const filteredDiff = removeUnchanged(diff);

  const plainedDiff = filteredDiff
    .map(decode)
    .join('\n');

  return plainedDiff;
};


export default toPlain;
