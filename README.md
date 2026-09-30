# ember-engines-router-service

[![npm version](https://badge.fury.io/js/ember-engines-router-service.svg)](https://badge.fury.io/js/ember-engines-router-service)
[![Build Status](https://github.com/villander/ember-engines-router-service/workflows/CI/badge.svg)](https://github.com/villander/ember-engines-router-service/actions?query=workflow%3ACI)

Provides the [Router service](https://api.emberjs.com/ember/release/classes/RouterService) inside [ember-engines](https://github.com/ember-engines/ember-engines): route names are relative to the engine, and `*External` methods reach the routes the engine's `externalRoutes` point to.

## Compatibility

- Ember.js v4.1 or above
- Embroider or ember-auto-import v2

CI covers Ember 4.1 through canary.

### Using this addon with Ember Engines under Vite/Embroider

If your app builds with Vite/Embroider, engines need two things the
[`ember-vite-codemod`](https://github.com/mainmatter/ember-vite-codemod) cannot
infer for you:

- If any engine is lazy (`lazyLoading: true`), `app/router.js` must extend
  `@embroider/router`, not `@ember/routing/router`: it loads a lazy engine's
  bundle before Ember looks up the engine's routes. Without it, visiting a lazy
  engine, or rendering a link to one, fails with *"You attempted to mount the
  engine '…', but it is not registered with its parent"*. Apps with only eager
  engines work with either router.
- Each engine must use `Resolver.withModules(compatModules)` and pass
  `compatModules` to `loadInitializers`:

  ```js
  import Engine from 'ember-engines/engine';
  import Resolver from 'ember-resolver';
  import loadInitializers from 'ember-load-initializers';
  import compatModules from '@embroider/virtual/compat-modules';
  import config from './config/environment';

  export default class MyEngine extends Engine {
    modulePrefix = config.modulePrefix;
    Resolver = Resolver.withModules(compatModules);
  }

  loadInitializers(MyEngine, config.modulePrefix, compatModules);
  ```

See [`test-app`](test-app) for a complete working setup.

## Installation

```sh
ember install ember-engines-router-service
```

## Usage

Inside an engine, `@service router` is this service. It mirrors the [RouterService](https://api.emberjs.com/ember/release/classes/RouterService) API with route names relative to the engine, and adds an `*External` counterpart for each navigation method that takes the name of one of the engine's `externalRoutes`:

| Engine routes  | External routes        |
| -------------- | ---------------------- |
| `transitionTo` | `transitionToExternal` |
| `replaceWith`  | `replaceWithExternal`  |
| `urlFor`       | `urlForExternal`       |
| `isActive`     | `isActiveExternal`     |
| `refresh`      | `refreshExternal`      |

It also provides `currentRouteName` (relative to the engine), `currentURL`, `rootURL`, and the `routeWillChange` and `routeDidChange` events. `currentRoute`, `recognize`, `recognizeAndLoad` and `location` are not available.

`refresh` is relative to the engine as well: `refresh('some.route')` reloads that route and its children, and `refresh()` reloads every active route of the engine, just as the app's `refresh()` reloads every active route of the app.

```js
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class SomeComponent extends Component {
  @service router;

  @action
  transitionToHome() {
    this.router.transitionToExternal('other.route');
  }

  @action
  transitionToAdmin() {
    this.router.transitionTo('admin.route');
  }

  @action
  redirectToHome() {
    this.router.replaceWithExternal('other.route');
  }

  @action
  redirectToLogin() {
    this.router.replaceWith('login.route');
  }
}
```

For further documentation on this subject, view the [Engine Linking RFC](https://github.com/emberjs/rfcs/pull/122).

## TypeScript

The library ships types for TypeScript usage:

```ts
import Service, { service } from '@ember/service';
import type EnginesRouterService from 'ember-engines-router-service/services/router';

export default class MyService extends Service {
  @service declare router: EnginesRouterService;

  doSomeTransition(): void {
    const transition = this.router.transitionToExternal('home');
    transition.data.someKey = 'someValue';
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
