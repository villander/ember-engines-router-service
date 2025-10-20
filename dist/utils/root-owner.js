import { getOwner } from '@ember/application';
import ApplicationInstance from '@ember/application/instance';

/**
 * This method is responsible for return app router from root application
 *
 * @public
 * @method getRootOwner
 * @param {Object} owner
 * @return {Router}
 */
const getRootOwner = object => {
  const owner = getOwner(object);
  if (owner instanceof ApplicationInstance) {
    return owner;
  }
  // eslint-disable-next-line ember/no-private-routing-service
  const appRouter = owner.lookup('router:main');
  return getOwner(appRouter);
};

export { getRootOwner };
//# sourceMappingURL=root-owner.js.map
