import Application from '@ember/application';
import EngineRouterService from '../services/engine-router-service';
import Engine from '@ember/engine';

Engine.reopen({
  buildRegistry() {
    let registry = this._super(...arguments);
    if (!(this instanceof Application)) {
      registry.register('service:router', EngineRouterService);
    }

    return registry;
  },
});
