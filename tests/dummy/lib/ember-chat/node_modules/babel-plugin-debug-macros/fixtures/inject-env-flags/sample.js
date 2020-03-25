import { DEBUG, TESTING } from '@ember/env-flags';

let testing;
if (TESTING) {
  testing = 'WOOT';
}

let debug;
if (DEBUG) {
  debug = 'DEBUG';
}