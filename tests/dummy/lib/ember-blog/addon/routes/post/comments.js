import Route from '@ember/routing/route';

export default class extends Route {
  model() {
    return this.modelFor('post');
  }
}
