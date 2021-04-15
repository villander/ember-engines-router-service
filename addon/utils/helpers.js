/*
  Check if a routeName resembles a url instead
  @private
*/
export function resemblesURL(str) {
    return typeof str === 'string' && (str === '' || str[0] === '/');
}