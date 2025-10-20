/**
 * Check if a routeName resembles a url.
 *
 * @public
 * @method namespaceEngineRouteName
 * @param {String} str
 * @return {boolean}
 */
function resemblesURL(str) {
  return typeof str === 'string' && (str === '' || str[0] === '/');
}

export { resemblesURL };
//# sourceMappingURL=resembles-url.js.map
