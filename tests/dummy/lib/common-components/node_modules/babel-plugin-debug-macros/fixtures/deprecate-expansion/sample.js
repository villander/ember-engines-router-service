import { DEBUG } from '@ember/env-flags';
import { deprecate } from '@ember/debug-tools';

deprecate('This is deprecated', true);
deprecate('Message without predicate');
