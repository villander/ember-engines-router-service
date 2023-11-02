import type RouterService from '@ember/routing/router-service';

export default interface EnginesRouterService
  extends Omit<
    RouterService,
    'currentRoute' | 'recognize' | 'recognizeAndLoad'
  > {
  isActiveExternal: RouterService['isActive'];
  replaceWithExternal: RouterService['replaceWith'];
  transitionToExternal: RouterService['transitionTo'];
  refreshExternal: RouterService['refresh'];
  urlForExternal: RouterService['urlFor'];
}
