# ember-engines-router-service

[![Build Status](https://travis-ci.org/villander/ember-engines-router-service.svg?branch=master)](https://travis-ci.org/villander/ember-engines-router-service)

This addon provides an API for authoring [Router service](https://api.emberjs.com/ember/release/classes/RouterService) in ember-engines.


## Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


## Installation
------------------------------------------------------------------------------

```
ember install ember-engines-router-service
```


## Usage

Basically you have all [RouterService](https://api.emberjs.com/ember/release/classes/RouterService) API **inside each engine** such as `transitionTo` and `isActive` and also the same one using new "external routing" APIs such as `transitionToExternal` and `isActiveExternal` to link external routes.

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


## Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


## License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
