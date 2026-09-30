/* eslint-disable ember/no-computed-properties-in-native-classes */
import Service from '@ember/service';
import { assert } from '@ember/debug';
import { action, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import Evented from '@ember/object/evented';
import { namespaceEngineRouteName } from '../utils/namespace-engine-route-name.js';
import { getRootOwner } from '../utils/root-owner.js';
import { resemblesURL } from '../utils/resembles-url.js';

const warningMessage =
  'Refresh method is not available in ember-source below v4.1';

export default class EngineRouterService extends Service.extend(Evented) {
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

  @action
  onRouteWillChange(...args) {
    this.trigger('routeWillChange', ...args);
  }

  @action
  onRouteDidChange(...args) {
    this.trigger('routeDidChange', ...args);
  }

  @reads('externalRouter.rootURL') rootURL;

  @reads('externalRouter.currentURL') currentURL;

  @computed('_mountPoint.length', 'externalRouter.currentRouteName')
  get currentRouteName() {
    if (this.externalRouter.currentRouteName === this._mountPoint) {
      return 'application';
    }
    return this.externalRouter.currentRouteName.slice(
      this._mountPoint.length + 1,
    );
  }

  get externalRouter() {
    return this.rootApplication.lookup('service:router');
  }

  getExternalRouteName(externalRouteName) {
    assert(
      `External route '${externalRouteName}' is unknown.`,
      externalRouteName in this._externalRoutes,
    );
    return this._externalRoutes[externalRouteName];
  }

  refresh(routeName = this.currentRouteName, ...args) {
    assert(warningMessage, typeof this.externalRouter.refresh === 'function');

    if (resemblesURL(routeName)) {
      return this.externalRouter.refresh(routeName);
    }

    return this.externalRouter.refresh(
      namespaceEngineRouteName(this._mountPoint, routeName),
      ...args,
    );
  }

  refreshExternal(routeName, ...args) {
    assert(warningMessage, typeof this.externalRouter.refresh === 'function');

    return this.externalRouter.refresh(
      this.getExternalRouteName(routeName),
      ...args,
    );
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

    return this.externalRouter.transitionTo(
      namespaceEngineRouteName(this._mountPoint, routeName),
      ...rest,
    );
  }

  transitionToExternal(routeName, ...args) {
    return this.externalRouter.transitionTo(
      this.getExternalRouteName(routeName),
      ...args,
    );
  }

  replaceWith(...args) {
    const [routeName, ...rest] = args;

    if (typeof routeName !== 'string') {
      return this.externalRouter.replaceWith(...args);
    }

    if (resemblesURL(routeName)) {
      return this.externalRouter.replaceWith(routeName);
    }

    return this.externalRouter.replaceWith(
      namespaceEngineRouteName(this._mountPoint, routeName),
      ...rest,
    );
  }

  replaceWithExternal(routeName, ...args) {
    return this.externalRouter.replaceWith(
      this.getExternalRouteName(routeName),
      ...args,
    );
  }

  urlFor(routeName, ...args) {
    return this.externalRouter.urlFor(
      namespaceEngineRouteName(this._mountPoint, routeName),
      ...args,
    );
  }

  urlForExternal(routeName, ...args) {
    return this.externalRouter.urlFor(
      this.getExternalRouteName(routeName),
      ...args,
    );
  }

  isActive(routeName, ...args) {
    return this.externalRouter.isActive(
      namespaceEngineRouteName(this._mountPoint, routeName),
      ...args,
    );
  }

  isActiveExternal(routeName, ...args) {
    return this.externalRouter.isActive(
      this.getExternalRouteName(routeName),
      ...args,
    );
  }
}
