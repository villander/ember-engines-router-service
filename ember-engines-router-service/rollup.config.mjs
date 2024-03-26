import { babel } from '@rollup/plugin-babel';
import { Addon } from '@embroider/addon-dev/rollup';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    // By default, all your JavaScript modules (**/*.js) will be importable.
    // But you are encouraged to tweak this to only cover the modules that make
    // up your addon's public API. Also make sure your package.json#exports
    // is aligned to the config here.
    // See https://github.com/embroider-build/embroider/blob/main/docs/v2-faq.md#how-can-i-define-the-public-exports-of-my-addon
    addon.publicEntrypoints(['**/*.js', 'index.js']),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    // addon.appReexports([
    //   'components/**/*.js',
    //   'helpers/**/*.js',
    //   'initializers/**/*.js',
    //   'modifiers/**/*.js',
    //   'services/**/*.js',
    // ]),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // For some reason, if v2 addon is dependency of an engine,
    // it does not get bundled when host app is built.
    //
    // A small change to format of re-export file makes it work,
    // however not clear exactly what is the root cause of such behavior, see
    // https://github.com/villander/ember-engines-router-service/issues/67#issuecomment-1253285115
    //
    // Below snippet extracted from
    // https://github.com/embroider-build/embroider/blob/main/packages/addon-dev/src/rollup-app-reexports.ts
    {
      name: 'custom-app-reexport',
      async generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: '_app_/initializers/ember-engines-router-service.js',
          source:
            'import initializer from "ember-engines-router-service/initializers/ember-engines-router-service";\n' +
            'export { initializer as default, initializer };\n',
        });
        this.emitFile({
          type: 'asset',
          fileName: '_app_/services/engine-router-service.js',
          source:
            'import service from "ember-engines-router-service/services/engine-router-service";\n' +
            'export default service;\n',
        });
      },
    },

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    //
    // By default, this will load the actual babel config from the file
    // babel.config.json.
    babel({
      extensions: ['.js', '.gjs'],
      babelHelpers: 'bundled',
    }),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // Ensure that .gjs files are properly integrated as Javascript
    addon.gjs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),
  ],
};
