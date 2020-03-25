import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit, find, click } from '@ember/test-helpers';


module('Acceptance | routeless engine demo', function (hooks) {
  setupApplicationTest(hooks);

  module('Engine Router Service', function() {

    test('transitionToExternal transitions to the parent application from within an engine and returns a thenable Transition object', async function (
      assert
    ) {
      assert.expect(2);

      await visit('/routable-engine-demo/ember-blog/post/1');
      await click('.routable-transition-external-button');

      assert.equal(currentURL(), '/');

      await click('.routeable-engine');
      await click('.ember-blog-new');
      await click('.trigger-transition-to');

      assert.ok(
        find('.routable-transition-external-button').classList.contains('transitioned-to-external')
      );
    });

    test('replaceWithExternal transitions to the parent application from within an engine and returns a thenable Transition object', async function (
      assert
    ) {
      assert.expect(2);

      await visit('/routable-engine-demo/ember-blog/post/1');
      await click('.routable-replace-external-button');

      assert.equal(currentURL(), '/');

      await click('.routeable-engine');
      await click('.ember-blog-new');
      await click('.trigger-transition-to');

      assert.ok(
        find('.routable-replace-external-button').classList.contains('replaced-with-external')
      );
    });

    test('urlForExternal Generate a URL based on the external route name', async function (
      assert
    ) {
      assert.expect(2);

      await visit('/routable-engine-demo/ember-blog/post/1');
      await click('.routable-url-for-external-button');

      assert.equal(currentURL(), '/routable-engine-demo/ember-blog/post/1');

      await click('.routeable-engine');
      await click('.ember-blog-new');
      await click('.trigger-transition-to');

      assert.ok(
        find('.routable-url-for-external-button').classList.contains('url-for-external')
      );
    });

    test('isActiveExternal Determines whether a parent external route is active', async function (
      assert
    ) {
      assert.expect(2);

      await visit('/routable-engine-demo/ember-blog/post/1');
      await click('.routable-is-active-external-button');

      assert.equal(currentURL(), '/routable-engine-demo/ember-blog/post/1');

      await click('.routeable-engine');
      await click('.ember-blog-new');
      await click('.trigger-transition-to');

      assert.ok(
        find('.routable-is-active-external-button').classList.contains('is-active-external')
      );
    });
  });

});