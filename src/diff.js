import _ from 'lodash';

const initialDepth = 1;

const getUniqKeys = (obj1, obj2) => _.union(Object.keys(obj1), Object.keys(obj2));

const buildDiff = (obj1, obj2, depth = initialDepth) => {
  const keys = getUniqKeys(obj1, obj2);

  const diff = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        key, type: 'added', value: obj2[key], depth,
      };
    }

    if (!_.has(obj2, key)) {
      return {
        key, type: 'deleted', value: obj1[key], depth,
      };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = buildDiff(obj1[key], obj2[key], depth + 1);
      return {
        key, type: 'nested', children, depth,
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', oldVal: obj1[key], newVal: obj2[key], depth,
      };
    }

    return {
      key, type: 'unchanged', value: obj1[key], depth,
    };
  });

  return diff;
};

export default buildDiff;
