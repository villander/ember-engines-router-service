import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

let count = 0;

export default class extends Route {
  @service exampleService;

  model() {
    // cause a service to be instantiated, so that our tests can
    // confirm that it gets cleaned up
    this.exampleService;

    return {
      name: 'Derek Zoolander',
      count: count++,
    };
  }
}
