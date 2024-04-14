# ember-engines-router-service

[![npm version](https://badge.fury.io/js/ember-engines-router-service.svg)](https://badge.fury.io/js/ember-engines-router-service)
[![Build Status](https://github.com/villander/ember-engines-router-service/workflows/CI/badge.svg)](https://github.com/villander/ember-engines-router-service/actions?query=workflow%3ACI)

This addon provides an API for authoring a [Router service](https://api.emberjs.com/ember/release/classes/RouterService) used in ember-engines.


## Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v3.24 or above
* Node.js v14 or above


## Installation
------------------------------------------------------------------------------

```
ember install ember-engines-router-service
```


## Usage

Basically you have the full [RouterService](https://api.emberjs.com/ember/release/classes/RouterService) API **inside each engine**. That means you can use APIs such as `transitionTo` and `isActive`, plus the new "external routing" APIs such as `transitionToExternal` and `isActiveExternal` which help link `externalRoutes` together.

------------------------------------------------------------------------------
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
------------------------------------------------------------------------------

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
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


## License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
