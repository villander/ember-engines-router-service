'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { compatBuild, recommendedOptions } = require('@embroider/compat');

module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

  const app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-engines-router-service'],
    },
  });

  // `optimized` turns on staticInvokables and forbids unsafe dynamic
  // components, which is what catches resolution problems the default
  // permissive build tolerates. @embroider/test-setup's embroiderSafe/
  // embroiderOptimized cannot be used here: they pin Embroider 3 and
  // @embroider/webpack, which conflict with @embroider/vite.
  const variant = process.env.EMBROIDER_TEST_SETUP_OPTIONS || 'safe';
  const options = recommendedOptions[variant];
  if (!options) {
    throw new Error(
      `Unknown EMBROIDER_TEST_SETUP_OPTIONS '${variant}'; expected one of ${Object.keys(recommendedOptions).join(', ')}`,
    );
  }

  return compatBuild(app, buildOnce, options);
};
