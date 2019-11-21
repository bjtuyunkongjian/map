import { CheckType } from 'tuyun-utils';

const IsArray = obj => Array.isArray(obj) || CheckType(obj) === 'array';

export default IsArray;
