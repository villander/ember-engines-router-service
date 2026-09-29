'use strict';

const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

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
        // Unreleased; allowed to fail so it warns without gating.
        name: 'ember-canary',
        allowedToFail: true,
        npm: {
          devDependencies: {
            'ember-source': 'alpha',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
