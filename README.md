# ember-engines-router-service

[![npm version](https://badge.fury.io/js/ember-engines-router-service.svg)](https://badge.fury.io/js/ember-engines-router-service)
[![Build Status](https://github.com/villander/ember-engines-router-service/workflows/CI/badge.svg)](https://github.com/villander/ember-engines-router-service/actions?query=workflow%3ACI)

This addon provides an API for authoring a [Router service](https://api.emberjs.com/ember/release/classes/RouterService) used in ember-engines.


## Compatibility

- Ember.js v3.24 or above
- Embroider or ember-auto-import v2

### Ember 7 requires a Vite/Embroider build

On **ember-source 7 with a classic (non-Vite) build, this addon silently does
nothing**: the engine's `router` service is never registered, and you get

```
Assertion Failed: Attempting to inject an unknown injection: 'service:router'
```

The addon registers its service by patching `Engine` from `@ember/engine`.
ember-source 7 dropped the AMD bundle, so on a classic build the v2 addon and
the app tree can resolve *different copies* of ember-source — the patch is
applied to one `Engine` class while your engines are built from the other. The
underlying resolution bug is
[embroider-build/embroider#2822](https://github.com/embroider-build/embroider/issues/2822).

Migrating the app to Vite gives it a single module graph and resolves this.
[`ember-vite-codemod`](https://github.com/mainmatter/ember-vite-codemod) handles
most of it. Two things it cannot know about, both required for engines:

- `app/router.js` must extend `@embroider/router`, not `@ember/routing/router`.
  Without it `mount()` fails with *"not registered with its parent"*.
- Engines must use `Resolver.withModules(compatModules)` and pass
  `compatModules` to `loadInitializers`.

See [`test-app`](test-app) for a complete working setup.

If you are on ember-source 6 or below, nothing changes — the classic build
works as it always has.

### What CI currently verifies

CI exercises ember-source 7.3 on a Vite/Embroider build. The `ember-lts-6.12`,
`ember-beta` and `ember-canary` scenarios run but are allowed to fail: they are
blocked on the same duplicate-ember-source bug above, via
[ember-engines/ember-engines#918](https://github.com/ember-engines/ember-engines/issues/918).

The supported range above is unchanged and the addon's own code has not changed,
but be aware that versions below 7.3 are currently under-tested rather than
actively verified.

## Installation

```
ember install ember-engines-router-service
```

## Usage

Basically you have the full [RouterService](https://api.emberjs.com/ember/release/classes/RouterService) API **inside each engine**. That means you can use APIs such as `transitionTo` and `isActive`, plus the new "external routing" APIs such as `transitionToExternal` and `isActiveExternal` which help link `externalRoutes` together.

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
