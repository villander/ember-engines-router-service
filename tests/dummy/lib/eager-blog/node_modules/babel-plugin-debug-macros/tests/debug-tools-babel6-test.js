'use strict';

const createTests = require('./create-tests');
const transform = require('babel-core').transform;

const presets = [
  [
    'babel-preset-env',
    {
      targets: {
        browsers: ['> 5%'],
      },
      modules: false,
    },
  ],
];

createTests({
  presets: presets,
  babelVersion: 6,
  transform: transform,
});
