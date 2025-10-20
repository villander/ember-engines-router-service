/* We intentionally test replaceWithExternal method which is not available in controllers */
/* eslint-disable ember/no-controller-access-in-routes */
import Route from '@ember/routing/route';

export default class extends Route {
  model(params) {
    return {
      user: this.modelFor('application'),
      id: params.id,
      title: `Post ${params.id}`,
    };
  }
}
