import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
  queryParams: ['lang'],
  router: service(),
  actions: {
    transitionToHomeByService() {
      this.router.transitionToExternal('home').then(() => {
        set(this, 'transitionToExternal', true);
      });
    },

    replaceWithHomeByService() {
      this.router.replaceWithExternal('home').then(() => {
        set(this, 'replaceWithExternal', true);
      });
    },

    copyPostURL() {
      const url = this.router.urlForExternal('home');
      set(this, 'urlForExternal', url);
      // Clipboard now has "/"
    },

    checkActiveState() {
      if (this.router.isActiveExternal('home')) {
        set(this, 'isActiveExternal', true);
      }
    },

    transitionToUrlByService(url) {
      this.router.transitionTo(url).then(() => {
        set(this, 'transitionTo', true);
      });
    }
  }
});
