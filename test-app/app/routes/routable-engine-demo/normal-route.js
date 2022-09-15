import Route from '@ember/routing/route';

export default class extends Route {
  beforeModel() {
    return this.transitionTo('routeless-engine-demo');
  }
}
