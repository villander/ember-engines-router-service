import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';

export default class extends Controller {
  queryParams = ['lang'];
  @service router;

  @action transitionToHomeByService() {
    this.router.transitionToExternal('home').then(() => {
      set(this, 'transitionToExternal', true);
    });
  }

  @action replaceWithHomeByService() {
    this.router.replaceWithExternal('home').then(() => {
      set(this, 'replaceWithExternal', true);
    });
  }

  @action copyPostURL() {
    const url = this.router.urlForExternal('home');
    set(this, 'urlForExternal', url);
    // Clipboard now has "/"
  }

  @action checkActiveState() {
    if (this.router.isActiveExternal('home')) {
      set(this, 'isActiveExternal', true);
    }
  }

  @action transitionToUrlByService(url) {
    this.router.transitionTo(url).then(() => {
      set(this, 'transitionTo', true);
    });
  }
}
