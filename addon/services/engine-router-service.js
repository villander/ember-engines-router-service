/* eslint-disable ember/no-computed-properties-in-native-classes */
import Service from '@ember/service';
import { assert } from '@ember/debug';
import { action, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import Evented from '@ember/object/evented';
import { namespaceEngineRouteName } from '../utils/namespace-engine-route-name';
import { getRootOwner } from '../utils/root-owner';
import { resemblesURL } from '../utils/resembles-url';

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
      this._mountPoint.length + 1
    );
  }

  get externalRouter() {
    return this.rootApplication.lookup('service:router');
  }

  getExternalRouteName(externalRouteName) {
    assert(
      `External route '${externalRouteName}' is unknown.`,
      externalRouteName in this._externalRoutes
    );
    return this._externalRoutes[externalRouteName];
  }

  transitionTo(routeName, ...args) {
    if (resemblesURL(routeName)) {
      return this.externalRouter.transitionTo(routeName);
    }

    return this.externalRouter.transitionTo(
      namespaceEngineRouteName(this._mountPoint, routeName),
      ...args
    );
  }

  transitionToExternal(routeName, ...args) {
    return this.externalRouter.transitionTo(
      this.getExternalRouteName(routeName),
      ...args
    );
  }

  replaceWith(routeName, ...args) {
    if (resemblesURL(routeName)) {
      return this.externalRouter.replaceWith(routeName);
    }

    return this.externalRouter.replaceWith(
      namespaceEngineRouteName(this._mountPoint, routeName),
      ...args
    );
  }

  replaceWithExternal(routeName, ...args) {
    return this.externalRouter.replaceWith(
      this.getExternalRouteName(routeName),
      ...args
    );
  }

  urlFor(routeName, ...args) {
    return this.externalRouter.urlFor(
      namespaceEngineRouteName(this._mountPoint, routeName),
      ...args
    );
  }

  urlForExternal(routeName, ...args) {
    return this.externalRouter.urlFor(
      this.getExternalRouteName(routeName),
      ...args
    );
  }

  isActive(routeName, ...args) {
    return this.externalRouter.isActive(
      namespaceEngineRouteName(this._mountPoint, routeName),
      ...args
    );
  }

  isActiveExternal(routeName, ...args) {
    return this.externalRouter.isActive(
      this.getExternalRouteName(routeName),
      ...args
    );
  }
}
