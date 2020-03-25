'use strict';

const normalizeOptions = require('../src/utils/normalize-options').normalizeOptions;

describe('normalizeOptions', function() {
  let originalConsole = Object.assign({}, console);

  afterEach(function() {
    Object.assign(console, originalConsole);
  });

  it('does not require the `debugTools` options', function() {
    let actual = normalizeOptions({});

    let expected = {
      debugTools: {
        debugToolsImport: '',
        assertPredicateIndex: undefined,
        isDebug: false,
      },
      externalizeHelpers: undefined,
      flags: {},
      svelte: undefined,
    };

    expect(actual).toEqual(expected);
  });

  it('converts "old style" options into the newer style (with deprecation)', function() {
    let warnings = [];
    console.warn = warning => warnings.push(warning); // eslint-disable-line

    let actual = normalizeOptions({
      envFlags: {
        source: '@ember/env-flags',
        flags: {
          DEBUG: false,
        },
      },
      debugTools: {
        source: '@ember/debug-tools',
      },
      features: {
        name: 'ember-source',
        source: '@ember/features',
        flags: {
          FEATURE_A: true,
          FEATURE_B: null,
        },
      },
    });

    let expected = {
      debugTools: {
        isDebug: false,
        assertPredicateIndex: undefined,
        debugToolsImport: '@ember/debug-tools',
      },
      flags: {
        '@ember/env-flags': {
          DEBUG: false,
        },
        '@ember/features': {
          FEATURE_A: true,
          FEATURE_B: null,
        },
      },
      externalizeHelpers: undefined,
    };

    expect(actual).toEqual(expected);
    expect(warnings).toEqual([
      'babel-plugin-debug-macros configuration API has changed, please update your configuration',
    ]);
  });

  it('sets flag to false when svelte version matches the flag version', function() {
    let actual = normalizeOptions({
      debugTools: {
        source: 'whatever',
        isDebug: true,
      },
      flags: [
        { name: 'ember-source', source: '@glimmer/env', flags: { DEBUG: true } },
        {
          name: 'ember-source',
          source: '@ember/deprecated-features',
          flags: { PARTIALS: '1.2.0' },
        },
        {
          name: 'ember-source',
          source: '@ember/canary-features',
          flags: { TRACKED: null, GETTERS: true },
        },
      ],
      svelte: { 'ember-source': '1.2.0' },
    });

    let expected = {
      debugTools: { isDebug: true, assertPredicateIndex: undefined, debugToolsImport: 'whatever' },
      flags: {
        '@glimmer/env': {
          DEBUG: true,
        },
        '@ember/deprecated-features': {
          PARTIALS: false,
        },
        '@ember/canary-features': {
          TRACKED: null,
          GETTERS: true,
        },
      },
      externalizeHelpers: undefined,
      svelte: { 'ember-source': '1.2.0' },
    };

    expect(actual).toEqual(expected);
  });

  it('sets flag to false when svelte version is higher than flag version', function() {
    let actual = normalizeOptions({
      debugTools: {
        source: 'whatever',
        isDebug: true,
      },
      svelte: { foo: '1.2.0' },
      flags: [
        { name: 'foo', source: 'foo/features', flags: { ABC: '1.1.0' } },
        { source: 'whatever', flags: { DEBUG: true } },
      ],
    });

    let expected = {
      debugTools: { isDebug: true, assertPredicateIndex: undefined, debugToolsImport: 'whatever' },
      flags: {
        'foo/features': { ABC: false },
        whatever: { DEBUG: true },
      },
      externalizeHelpers: undefined,
      svelte: { foo: '1.2.0' },
    };

    expect(actual).toEqual(expected);
  });

  it('sets flag to true when svelte version is lower than flag version', function() {
    let actual = normalizeOptions({
      debugTools: {
        source: 'whatever',
        isDebug: true,
      },
      svelte: { foo: '1.0.0' },
      flags: [
        { name: 'foo', source: 'foo/features', flags: { ABC: '1.1.0' } },
        { source: 'whatever', flags: { DEBUG: true } },
      ],
    });

    let expected = {
      debugTools: { isDebug: true, assertPredicateIndex: undefined, debugToolsImport: 'whatever' },
      flags: {
        'foo/features': { ABC: true },
        whatever: { DEBUG: true },
      },
      externalizeHelpers: undefined,
      svelte: { foo: '1.0.0' },
    };

    expect(actual).toEqual(expected);
  });

  it('sets flag to true when svelte version is a beta version higher than flag version', function() {
    let actual = normalizeOptions({
      debugTools: {
        source: 'whatever',
        isDebug: true,
      },
      svelte: { foo: '1.2.0' },
      flags: [
        { name: 'foo', source: 'foo/features', flags: { ABC: '1.1.0-beta.1' } },
        { source: 'whatever', flags: { DEBUG: true } },
      ],
    });

    let expected = {
      debugTools: { isDebug: true, assertPredicateIndex: undefined, debugToolsImport: 'whatever' },
      flags: {
        'foo/features': { ABC: false },
        whatever: { DEBUG: true },
      },
      externalizeHelpers: undefined,
      svelte: { foo: '1.2.0' },
    };

    expect(actual).toEqual(expected);
  });
});
