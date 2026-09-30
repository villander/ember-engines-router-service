import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: 'ES2022',
    },
    // The engines are v1 addons rewritten by @embroider/compat; pre-bundling
    // them hides their engine.js from the mount() lookup at runtime.
    exclude: ['ember-blog', 'ember-chat', 'eager-blog'],
  },
});
