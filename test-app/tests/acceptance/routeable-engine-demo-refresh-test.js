import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, find, click, settled } from '@ember/test-helpers';
import { macroCondition, dependencySatisfies } from '@embroider/macros';

// Each counter shows how many times that route's model hook has run.
const COUNTERS = {
  host: '.global-refresh-counter',
  engine: '.engine-refresh-counter',
  new: '.route-refresh-counter',
  post: '.post-refresh-counter',
  comments: '.comments-refresh-counter',
};

function readCounters() {
  const counts = {};
  for (const [name, selector] of Object.entries(COUNTERS)) {
    const element = find(selector);
    if (element) {
      counts[name] = element.textContent.trim();
    }
  }
  return counts;
}

async function reloadedBy(action) {
  const before = readCounters();
  await action();
  await settled();
  const after = readCounters();
  return Object.keys(before).filter((name) => after[name] !== before[name]);
}

if (macroCondition(dependencySatisfies('ember-source', '>= 4.1.0'))) {
  module(
    'Acceptance | Engine Router Service | Refresh Method',
    function (hooks) {
      setupApplicationTest(hooks);

      test('the host RouterService#refresh without params refreshes every active route', async function (assert) {
        await visit('/routable-engine-demo/ember-blog/new');
        const router = this.owner.lookup('service:router');

        assert.deepEqual(await reloadedBy(() => router.refresh()), [
          'host',
          'engine',
          'new',
        ]);
      });

      test('refresh without params refreshes every active route of the engine', async function (assert) {
        await visit('/routable-engine-demo/ember-blog/new');

        assert.deepEqual(await reloadedBy(() => click('.refresh')), [
          'engine',
          'new',
        ]);
      });

      test('refresh with params refreshes only the provided route', async function (assert) {
        await visit('/routable-engine-demo/ember-blog/new');

        assert.deepEqual(await reloadedBy(() => click('.refresh-route')), [
          'new',
        ]);
      });

      test('refresh with a parent route refreshes it and its children', async function (assert) {
        await visit('/routable-engine-demo/ember-blog/post/1/comments');

        assert.deepEqual(await reloadedBy(() => click('.refresh-post')), [
          'post',
          'comments',
        ]);
      });

      test('refresh with params in an engine mounted with resetNamespace', async function (assert) {
        await visit('/routable-engine-demo/blog/new');

        assert.deepEqual(await reloadedBy(() => click('.refresh-route')), [
          'new',
        ]);
      });

      test('refresh external route', async function (assert) {
        await visit('/routable-engine-demo/ember-blog/new');

        // `home` is the host application route, so everything below it reloads.
        assert.deepEqual(await reloadedBy(() => click('.refresh-external')), [
          'host',
          'engine',
          'new',
        ]);
      });
    },
  );
}
