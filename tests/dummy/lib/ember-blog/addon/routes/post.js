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
