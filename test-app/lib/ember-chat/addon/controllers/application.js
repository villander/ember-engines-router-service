import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

let count = 0;

export default class extends Controller {
  @tracked name = `ember-chat-${++count}`;
  @service exampleService;

  constructor() {
    super(...arguments);

    this.exampleService; // Access the service to create the instance.
  }
}
