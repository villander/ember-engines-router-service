import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class extends Controller {
  @service router;

  @action goAway() {
    this.router.transitionTo('post', 1);
  }

  @action goAwayViaURL() {
    this.router.transitionTo('/post/1');
  }
}
