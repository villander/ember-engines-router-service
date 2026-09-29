# ember-engines-router-service

[![npm version](https://badge.fury.io/js/ember-engines-router-service.svg)](https://badge.fury.io/js/ember-engines-router-service)
[![Build Status](https://github.com/villander/ember-engines-router-service/workflows/CI/badge.svg)](https://github.com/villander/ember-engines-router-service/actions?query=workflow%3ACI)

This addon provides an API for authoring a [Router service](https://api.emberjs.com/ember/release/classes/RouterService) used in ember-engines.


## Compatibility

- Ember.js v4.1 or above
- Embroider or ember-auto-import v2

v4.1 is the floor because `refresh` relies on `RouterService#refresh`, added in
that release. Earlier versions are not merely untested: ember-source 4.0 does
not export `service` from `@ember/service`, and ember-cli 7 cannot build
ember-source 3.28, so they cannot be exercised at all. CI covers 4.1 through
canary.

### Using this addon with Ember Engines under Vite/Embroider

If your app builds with Vite/Embroider, engines need two things the
[`ember-vite-codemod`](https://github.com/mainmatter/ember-vite-codemod) cannot
infer for you:

- `app/router.js` must extend `@embroider/router`, not `@ember/routing/router`.
  Without it, `mount()` fails with *"not registered with its parent"*.
- Each engine must use `Resolver.withModules(compatModules)` and pass
  `compatModules` to `loadInitializers`.

See [`test-app`](test-app) for a complete working setup.

### A note for monorepos

This addon registers its service by patching `Engine` from `@ember/engine`. That
only works if the addon and your app resolve the **same copy** of `ember-source`.

In a normal app that installs the addon from npm this is automatic. In a
monorepo where the addon is a workspace package it is not: pnpm gives the
addon's `ember-source` peerDependency a copy of its own, so the patch lands on a
different `Engine` class than your engines are built from and you get

```
Assertion Failed: Attempting to inject an unknown injection: 'service:router'
```

The fix is to inject workspace dependencies so their peers resolve from the
consuming app:

```json
{
  "dependenciesMeta": {
    "ember-engines-router-service": { "injected": true }
  }
}
```

## Installation

```
ember install ember-engines-router-service
```

## Usage

Basically you have the full [RouterService](https://api.emberjs.com/ember/release/classes/RouterService) API **inside each engine**. That means you can use APIs such as `transitionTo` and `isActive`, plus the new "external routing" APIs such as `transitionToExternal` and `isActiveExternal` which help link `externalRoutes` together.

Route names are relative to the engine, and so is `refresh`: `refresh('some.route')` reloads that route and its children, and `refresh()` reloads every active route of the engine, just as the app's `refresh()` reloads every active route of the app.

```js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

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
import Service, { inject as service } from '@ember/service';
import type EnginesRouterService from 'ember-engines-router-service/services/router';

export default class MyService extends Service {
  @service declare router: EnginesRouterService;

  doSomeTranstion (): void {
    const transition = this.router.transitionToExternal('someRouter');
    transition.data.someKey = 'someValue';
  }
}
```


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
