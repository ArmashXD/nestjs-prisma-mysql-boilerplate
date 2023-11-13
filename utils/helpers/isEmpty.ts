/**
 * The function checks if a value is empty by checking if it is null, undefined, an empty string, an
 * empty array, or an empty object.
 * @param {any} value - The `value` parameter can be of any type. It is the value that you want to
 * check for emptiness.
 * @returns a boolean value. It returns true if the value is empty (null, undefined, empty string,
 * empty array, or empty object), and false otherwise.
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0 || value.every(isEmpty);
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0 && value.constructor === Object;
  }

  return false;
}
