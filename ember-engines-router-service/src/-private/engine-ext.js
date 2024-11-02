import Application from '@ember/application';
import Engine from '@ember/engine';
import EngineRouterService from '../services/engine-router-service.js';

Engine.reopen({
  buildRegistry() {
    let registry = this._super(...arguments);
    if (!(this instanceof Application)) {
      registry.register('service:router', EngineRouterService);
    }

    return registry;
  },
});
