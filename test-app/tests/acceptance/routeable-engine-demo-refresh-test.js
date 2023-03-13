import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, find, click } from '@ember/test-helpers';

module('Acceptance | routeless engine demo', function (hooks) {
  setupApplicationTest(hooks);

  module('Engine Router Service Refresh Method', function () {
    test('refresh without params triggers refresh with current route', async function (assert) {
      await visit('/routable-engine-demo/ember-blog/new');

      let counter = await find('.route-refresh-counter').textContent;
      assert.dom('.route-refresh-counter').hasText(counter);
      await click('.refresh');

      counter = parseInt(counter, 10);
      counter = ++counter;
      counter = counter.toString();
      assert.dom('.route-refresh-counter').hasText(counter);
    });

    test('refresh with params triggers refresh on provided route', async function (assert) {
      await visit('/routable-engine-demo/ember-blog/new');

      let counter = await find('.route-refresh-counter').textContent;
      assert.dom('.route-refresh-counter').hasText(counter);
      await click('.refresh-route');

      counter = parseInt(counter, 10);
      counter = ++counter;
      counter = counter.toString();
      assert.dom('.route-refresh-counter').hasText(counter);
    });

    test('refresh external route', async function (assert) {
      await visit('/routable-engine-demo/ember-blog/new');

      let counter = await find('.route-refresh-counter').textContent;
      assert.dom('.global-refresh-counter').hasText(counter);
      await click('.refresh-external');

      counter = parseInt(counter, 10);
      counter = ++counter;
      counter = counter.toString();
      assert.dom('.global-refresh-counter').hasText(counter);
    });
  });
});
