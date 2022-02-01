import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  queryParams = ['lang'];
  @service router;

  @tracked isActiveExternal = false;
  @tracked replacedWithExternal = false;
  @tracked transitionedToExternal = false;
  @tracked transitionTo = false;

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
    this.urlForExternal = this.router.urlForExternal('home');
    // Clipboard now has "/"
  }

  @action checkActiveState() {
    if (this.router.isActiveExternal('home')) {
      this.isActiveExternal = true;
    }
  }

  @action transitionToUrlByService(url) {
    this.router.transitionTo(url).then(() => {
      this.transitionTo = true;
    });
  }

  @action goToChineseVersion() {
    this.router.transitionTo({ queryParams: { lang: 'Chinese' } });
  }

  @action transitionToHome() {
    this.router.transitionToExternal('home').then(() => {
      this.transitionedToExternal = true;
    });
  }

  @action replaceWithHome() {
    this.router.replaceWithExternal('home').then(() => {
      this.replacedWithExternal = true;
    });
  }
}
