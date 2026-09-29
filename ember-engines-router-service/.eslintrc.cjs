'use strict';

module.exports = {
  root: true,
  // Only use overrides
  // https://github.com/ember-cli/eslint-plugin-ember?tab=readme-ov-file#gtsgjs
  overrides: [
    {
      files: ['**/*.js'],
      env: { browser: true },
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // babel-plugin-ember-template-compilation 4 is async-only and
        // @babel/eslint-parser runs Babel synchronously; lint does not need the
        // real build config, so skip loading it.
        requireConfigFile: false,
        babelOptions: {
          root: __dirname,
          configFile: false,
          babelrc: false,
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              { decoratorsBeforeExport: true },
            ],
          ],
        },
      },
      plugins: ['ember', 'import'],
      extends: [
        'eslint:recommended',
        'plugin:ember/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        // require relative imports use full extensions
        'import/extensions': ['error', 'always', { ignorePackages: true }],
        // Add any custom rules here
      },
    },
    {
      files: ['**/*.gjs'],
      parser: 'ember-eslint-parser',
      plugins: ['ember', 'import'],
      extends: [
        'eslint:recommended',
        'plugin:ember/recommended',
        'plugin:ember/recommended-gjs',
        'plugin:prettier/recommended',
      ],
      rules: {
        // require relative imports use full extensions
        'import/extensions': ['error', 'always', { ignorePackages: true }],
        // Add any custom rules here
      },
    },
    // node files
    {
      files: [
        './.eslintrc.cjs',
        './.prettierrc.cjs',
        './.template-lintrc.cjs',
        './addon-main.cjs',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['n'],
      extends: [
        'eslint:recommended',
        'plugin:n/recommended',
        'plugin:prettier/recommended',
      ],
    },
  ],
};
