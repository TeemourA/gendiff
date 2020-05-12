import _ from 'lodash';

export default (obj1, obj2) => _.union(Object.keys(obj1), Object.keys(obj2));
