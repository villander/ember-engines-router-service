import { warn, assert, deprecate } from '@ember/debug';
import { DEBUG } from '@glimmer/env';

if (DEBUG) {
  doStuff();
}

warn('This is a warning');

assert('Hahahaha', foo);
assert('without predicate');

deprecate('This thing is donzo', true, {
  id: 'donzo',
  until: '4.0.0',
  url: 'http://example.com'
});
