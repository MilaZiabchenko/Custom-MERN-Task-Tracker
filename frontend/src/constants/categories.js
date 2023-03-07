import { getEnumObject } from '../utils/getEnumObject.js';

const CATEGORIES = getEnumObject({
  LATEST: 'Latest',
  PRIOR: 'Prior',
  TODO: 'To Do',
  DONE: 'Done'
});

export { CATEGORIES };
