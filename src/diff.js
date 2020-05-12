import _ from 'lodash';
import getUniqKeys from './utils/keys.js';

const buildDiff = (obj1, obj2) => {
  const keys = getUniqKeys(obj1, obj2);

  const diff = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }

    if (obj1[key] === obj2[key]) {
      return { key, type: 'unchanged', value: obj1[key] };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = buildDiff(obj1[key], obj2[key]);
      return { key, type: 'nested', children };
    }

    return {
      key, type: 'changed', oldVal: obj1[key], newVal: obj2[key],
    };
  });

  return diff;
};

export default buildDiff;
