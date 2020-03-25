import { FEATURE_B } from '@ember/features';

if (true
/* FEATURE_A */
) {
  console.log('woot');
}

if (FEATURE_B) {
  console.log('aw yea');
}