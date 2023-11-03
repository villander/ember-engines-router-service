import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, find, click } from '@ember/test-helpers';
import { macroCondition, dependencySatisfies } from '@embroider/macros';

if (macroCondition(dependencySatisfies('ember-source', '>= 4.1.0'))) {
  module(
    'Acceptance | Engine Router Service | Refresh Method',
    function (hooks) {
      setupApplicationTest(hooks);

      test('refresh without params triggers refresh with current route', async function (assert) {
        await visit('/routable-engine-demo/ember-blog/new');

        let counter = await find('.route-refresh-counter').textContent;

        await click('.refresh');

        counter = parseInt(counter, 10);
        counter = ++counter;
        counter = counter.toString();
        assert.dom('.route-refresh-counter').hasText(counter);
      });

      test('refresh with params triggers refresh on provided route', async function (assert) {
        await visit('/routable-engine-demo/ember-blog/new');

        let counter = await find('.route-refresh-counter').textContent;
        await click('.refresh-route');

        counter = parseInt(counter, 10);
        counter = ++counter;
        counter = counter.toString();
        assert.dom('.route-refresh-counter').hasText(counter);
      });

      test('refresh external route', async function (assert) {
        await visit('/routable-engine-demo/ember-blog/new');

        let counter = await find('.route-refresh-counter').textContent;
        await click('.refresh-external');

        counter = parseInt(counter, 10);
        counter = ++counter;
        counter = counter.toString();
        assert.dom('.global-refresh-counter').hasText(counter);
      });
    }
  );
}
