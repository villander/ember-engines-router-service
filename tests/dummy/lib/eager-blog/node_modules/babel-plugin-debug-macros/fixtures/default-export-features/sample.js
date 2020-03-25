import { assign } from 'ember-utils';
import { ENV } from 'ember-environment';
import DEFAULT_FEATURES from '@ember/features';

export const FEATURES = assign(DEFAULT_FEATURES, ENV.FEATURES);