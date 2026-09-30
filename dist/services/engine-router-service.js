import Service from '@ember/service';
import { assert } from '@ember/debug';
import { action, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import Evented from '@ember/object/evented';
import { namespaceEngineRouteName } from '../utils/namespace-engine-route-name.js';
import { getRootOwner } from '../utils/root-owner.js';
import { resemblesURL } from '../utils/resembles-url.js';
import { n, g, i } from 'decorator-transforms/runtime';

/* eslint-disable ember/no-computed-properties-in-native-classes */
const warningMessage = 'Refresh method is not available in ember-source below v4.1';
class EngineRouterService extends Service.extend(Evented) {
  constructor(...args) {
    super(...args);
    this._externalRoutes = getOwner(this)._externalRoutes;
    // eslint-disable-next-line ember/no-assignment-of-untracked-properties-used-in-tracking-contexts
    this._mountPoint = getOwner(this).mountPoint;
    this.rootApplication = getRootOwner(this);
    this.externalRouter.on('routeWillChange', this.onRouteWillChange);
    this.externalRouter.on('routeDidChange', this.onRouteDidChange);
  }
  willDestroy() {
    this.externalRouter.off('routeWillChange', this.onRouteWillChange);
    this.externalRouter.off('routeDidChange', this.onRouteDidChange);
    super.willDestroy();
  }
  onRouteWillChange(...args) {
    this.trigger('routeWillChange', ...args);
  }
  static {
    n(this.prototype, "onRouteWillChange", [action]);
  }
  onRouteDidChange(...args) {
    this.trigger('routeDidChange', ...args);
  }
  static {
    n(this.prototype, "onRouteDidChange", [action]);
  }
  static {
    g(this.prototype, "rootURL", [reads('externalRouter.rootURL')]);
  }
  #rootURL = (i(this, "rootURL"), void 0);
  static {
    g(this.prototype, "currentURL", [reads('externalRouter.currentURL')]);
  }
  #currentURL = (i(this, "currentURL"), void 0);
  get currentRouteName() {
    if (this.externalRouter.currentRouteName === this._mountPoint) {
      return 'application';
    }
    return this.externalRouter.currentRouteName.slice(this._mountPoint.length + 1);
  }
  static {
    n(this.prototype, "currentRouteName", [computed('_mountPoint.length', 'externalRouter.currentRouteName')]);
  }
  get externalRouter() {
    return this.rootApplication.lookup('service:router');
  }
  getExternalRouteName(externalRouteName) {
    assert(`External route '${externalRouteName}' is unknown.`, externalRouteName in this._externalRoutes);
    return this._externalRoutes[externalRouteName];
  }
  refresh(routeName) {
    assert(warningMessage, typeof this.externalRouter.refresh === 'function');

    // Without a route name `RouterService#refresh` refreshes every active
    // route; within an engine those start at the engine's application route.
    const pivotRouteName = routeName || 'application';
    if (resemblesURL(pivotRouteName)) {
      return this.externalRouter.refresh(pivotRouteName);
    }

    // The host router looks up its pivot route on the host owner, which cannot
    // see engine routes, so it would fall back to refreshing every active route.
    const route = getOwner(this).lookup(`route:${pivotRouteName}`);
    assert(`The route "${pivotRouteName}" was not found`, route);
    assert(`The route "${pivotRouteName}" is currently not active`, this.isActive(pivotRouteName));
    return route.refresh();
  }
  refreshExternal(routeName, ...args) {
    assert(warningMessage, typeof this.externalRouter.refresh === 'function');
    return this.externalRouter.refresh(this.getExternalRouteName(routeName), ...args);
  }
  transitionTo(...args) {
    const [routeName, ...rest] = args;

    // As with `RouterService`, only a leading string is a route name; models
    // or query params on their own apply to the current route.
    if (typeof routeName !== 'string') {
      return this.externalRouter.transitionTo(...args);
    }
    if (resemblesURL(routeName)) {
      return this.externalRouter.transitionTo(routeName);
    }
    return this.externalRouter.transitionTo(namespaceEngineRouteName(this._mountPoint, routeName), ...rest);
  }
  transitionToExternal(routeName, ...args) {
    return this.externalRouter.transitionTo(this.getExternalRouteName(routeName), ...args);
  }
  replaceWith(...args) {
    const [routeName, ...rest] = args;
    if (typeof routeName !== 'string') {
      return this.externalRouter.replaceWith(...args);
    }
    if (resemblesURL(routeName)) {
      return this.externalRouter.replaceWith(routeName);
    }
    return this.externalRouter.replaceWith(namespaceEngineRouteName(this._mountPoint, routeName), ...rest);
  }
  replaceWithExternal(routeName, ...args) {
    return this.externalRouter.replaceWith(this.getExternalRouteName(routeName), ...args);
  }
  urlFor(routeName, ...args) {
    return this.externalRouter.urlFor(namespaceEngineRouteName(this._mountPoint, routeName), ...args);
  }
  urlForExternal(routeName, ...args) {
    return this.externalRouter.urlFor(this.getExternalRouteName(routeName), ...args);
  }
  isActive(routeName, ...args) {
    return this.externalRouter.isActive(namespaceEngineRouteName(this._mountPoint, routeName), ...args);
  }
  isActiveExternal(routeName, ...args) {
    return this.externalRouter.isActive(this.getExternalRouteName(routeName), ...args);
  }
}

export { EngineRouterService as default };
//# sourceMappingURL=engine-router-service.js.map
