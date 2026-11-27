import { module, test } from 'qunit';
import { setupTest } from 'test-app/tests/helpers';
import { setupEngine } from 'ember-engines/test-support';

module('Integration | Service | engine router service', function (hooks) {
  setupTest(hooks);
  setupEngine(hooks, 'eager-blog');

  test('currentRouteName is null before anything transitions', function (assert) {
    const router = this.engine.lookup('service:router');

    assert.strictEqual(router.currentRouteName, null);
  });
});
