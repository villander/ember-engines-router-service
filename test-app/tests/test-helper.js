import Application from 'test-app/app';
import config from 'test-app/config/environment';
import manifest from 'test-app/config/asset-manifest';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import preloadAssets from 'ember-asset-loader/test-support/preload-assets';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

preloadAssets(manifest).then(start);
