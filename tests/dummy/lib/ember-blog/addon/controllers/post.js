import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';

export default Controller.extend({
  queryParams: ['lang'],
  router: service(),
  actions: {
    transitionToHomeByService() {
      get(this, 'router').transitionToExternal('home').then(() => {
        set(this, 'transitionToExternal', true);
      });
    },

    replaceWithHomeByService() {
      get(this, 'router').replaceWithExternal('home').then(() => {
        set(this, 'replaceWithExternal', true);
      });
    },

    copyPostURL() {
      const url = get(this, 'router').urlForExternal('home');
      set(this, 'urlForExternal', url);
      // Clipboard now has "/"
    },

    checkActiveState() {
      if (get(this, 'router').isActiveExternal('home')) {
        set(this, 'isActiveExternal', true);
      }
    },

    transitionToUrlByService(url) {
      get(this, 'router').transitionTo(url).then(() => {
        set(this, 'transitionTo', true);
      });
    }
  }
});
