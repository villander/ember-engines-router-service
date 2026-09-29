import Route from '@ember/routing/route';

let count = 0;

export default class extends Route {
  model() {
    return { ...this.modelFor('post'), count: count++ };
  }
}
