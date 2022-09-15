/**
 * Check if a routeName resembles a url.
 *
 * @public
 * @method namespaceEngineRouteName
 * @param {String} str
 * @return {boolean}
 */
export function resemblesURL(str) {
  return typeof str === 'string' && (str === '' || str[0] === '/');
}
