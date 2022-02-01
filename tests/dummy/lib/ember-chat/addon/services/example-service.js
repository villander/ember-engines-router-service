import Service, { inject as service } from '@ember/service';

export default class extends Service {
  @service store;

  constructor () {
    super(...arguments);

    // The store is provided by the containing application, so it's a convenient rendezvous point for our tests to be able to observe this instance.
    this.store.__exampleServiceForTesting = this;
  }
}
