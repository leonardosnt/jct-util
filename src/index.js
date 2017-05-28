import { utf8ByteArrayToString } from 'utf8-string-bytes';

/**
 * Get attribute by name.
 *
 * @param {any} classFile - The class file
 * @param {any} target - Object you want get attribute from
 * @param {string} attributeName - Attribute name
 * @returns {any} - The attribute
 */
export function getAttribute(classFile, target, attributeName) {
  const attributes = target.attributes;

  if (attributes == undefined) {
    throw new Error('target does not have attributes');
  }

  return attributes.filter(attr => {
    const nameBytes = classFile.constant_pool[attr.attribute_name_index].bytes;
    return utf8ByteArrayToString(nameBytes) === attributeName;
  })[0];
}

/**
 * Get and convert a string from a contant_pool.
 *
 * @export
 * @param {any} constant_pool - The constant_pool
 * @param {any} index - Index in constant_pool
 * @returns {string} - The string
 */
export function getPoolString(constant_pool, index) {
  let poolEntry = constant_pool[index];

  if (poolEntry.tag === 8) { // CONSTANT_String_info
    poolEntry = constant_pool[poolEntry.string_index];
  } else if (poolEntry.tag !== 1) { // CONSTANT_Utf8_info
    throw new Error('constant_pool[index] does not represent a string.');
  }

  return utf8ByteArrayToString(poolEntry.bytes);
}