import { DEBUG } from '@ember/env-flags';
import { assert } from '@ember/debug-tools';

assert((() => true )(), 'This is an assertion');
assert(false, 'This is an assertion 2');