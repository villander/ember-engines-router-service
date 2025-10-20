/**
 * This method is responsible for return route name from engine namespace
 *
 * @public
 * @method namespaceEngineRouteName
 * @param {String} mountPoint
 * @param {String} routeName
 * @return {String}
 */
function namespaceEngineRouteName(mountPoint, routeName) {
  if (routeName === 'application') {
    return mountPoint;
  } else {
    return `${mountPoint}.${routeName}`;
  }
}

export { namespaceEngineRouteName };
//# sourceMappingURL=namespace-engine-route-name.js.map
