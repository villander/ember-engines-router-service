// Load extensions to Ember
import '../-private/engine-ext.js';

// TODO: Move to ensure they run prior to instantiating Ember.Application
export function initialize() {}

export default {
  name: 'ember-engines-router-service',
  initialize,
};
