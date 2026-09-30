# How To Contribute

## Installation

- `git clone https://github.com/villander/ember-engines-router-service.git`
- `cd ember-engines-router-service`
- `pnpm install`

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Building the addon

- `cd ember-engines-router-service`
- `pnpm build`

## Running tests

- `cd test-app`
- `pnpm test` – Lints and runs the test suite on the current Ember version
- `pnpm test:ember` – Runs only the test suite
- `pnpm exec ember try:one <scenario>` – Runs the test suite against one of the
  Ember versions in [`config/ember-try.js`](test-app/config/ember-try.js), for
  example `ember-canary`

`test-app` installs the addon and the engines in `test-app/lib` as injected
workspace packages (`dependenciesMeta.injected`), so their peer dependencies
resolve from `test-app`. pnpm copies injected packages when it installs them:
after editing anything under `test-app/lib`, run `pnpm install --force` so the
next build picks up the change.

### Supported Ember versions

CI starts at Ember 4.1 because older versions cannot be exercised: ember-source
4.0 does not export `service` from `@ember/service`, and ember-cli 7 cannot build
ember-source 3.28.

## Running the test application

- `pnpm start` from the repository root rebuilds the addon on change and serves
  `test-app`
- Visit the URL Vite prints, [http://localhost:5173](http://localhost:5173) by
  default.

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
