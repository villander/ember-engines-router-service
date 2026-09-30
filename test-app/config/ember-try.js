'use strict';

// Companions that predate Ember 7; the versions in package.json assume it.
const olderToolchain = {
  '@ember/test-helpers': '^4.0.5',
  '@glimmer/component': '^1.1.2',
};

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-4.1',
        npm: {
          devDependencies: {
            'ember-source': '~4.1.0',
            ...olderToolchain,
          },
        },
      },
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            'ember-source': '~4.4.0',
            ...olderToolchain,
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '~4.8.0',
            ...olderToolchain,
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
            ...olderToolchain,
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
            ...olderToolchain,
          },
        },
      },
      {
        name: 'ember-lts-5.8',
        npm: {
          devDependencies: {
            'ember-source': '~5.8.0',
            ...olderToolchain,
          },
        },
      },
      {
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
            ...olderToolchain,
          },
        },
      },
      {
        name: 'ember-lts-6.12',
        npm: {
          devDependencies: {
            'ember-source': 'lts',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': 'latest',
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': 'beta',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': 'alpha',
          },
        },
      },
      // The app always builds with Embroider, so these vary the compat
      // options rather than swapping the build. @embroider/test-setup's
      // embroiderSafe/embroiderOptimized cannot be used: they pin Embroider 3
      // and @embroider/webpack, which conflict with @embroider/vite.
      {
        name: 'embroider-safe',
        env: { EMBROIDER_TEST_SETUP_OPTIONS: 'safe' },
        npm: { devDependencies: {} },
      },
      {
        name: 'embroider-optimized',
        env: { EMBROIDER_TEST_SETUP_OPTIONS: 'optimized' },
        npm: { devDependencies: {} },
      },
    ],
  };
};
