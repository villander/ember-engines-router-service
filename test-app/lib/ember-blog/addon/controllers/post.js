import Controller from '@ember/controller';
import { service } from '@ember/service';
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

  @action transitionToLanguageByService(lang) {
    this.router.transitionTo({ queryParams: { lang } });
  }

  @action replaceWithLanguageByService(lang) {
    this.router.replaceWith({ queryParams: { lang } });
  }

  @action goToChineseVersion() {
    this.transitionTo({ queryParams: { lang: 'Chinese' } });
  }

  @action transitionToHome() {
    this.transitionToExternal('home').then(() => {
      var postController = this.controllerFor(this.routeName);
      postController.set('transitionedToExternal', true);
    });
  }

  @action replaceWithHome() {
    this.replaceWithExternal('home').then(() => {
      var postController = this.controllerFor(this.routeName);
      postController.set('replacedWithExternal', true);
    });
  }
}
