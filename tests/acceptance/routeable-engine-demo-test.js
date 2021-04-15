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

    test('transitionTo transitions to the parent application from within an engine and returns a thenable Transition object', async function (
      assert
    ) {
      assert.expect(2);

      await visit('/');
      await click('.routeable-engine');
      await click('.blog-post-1-link-ch');
      await click('.routable-transition-to-url-button');

      assert.equal(currentURL(), '/routable-engine-demo/blog/post/2?lang=Korean');

      assert.ok(
        find('.routable-transition-to-url-button').classList.contains('transitioned-to-url')
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