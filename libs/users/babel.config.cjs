/**
 * This babel.config is not used for publishing.
 * It's only for the local editing experience
 * (and linting)
 */
const { buildMacros } = require('@embroider/macros/babel');

const {
  babelCompatSupport,
  templateCompatSupport,
} = require('@embroider/compat/babel');
const { setConfig } = require('@warp-drive/core/build-config');

const Macros = buildMacros({
  configure: (config) => {
    setConfig(config, {
      compatWith: '5.6'
    });
  },
});

// For scenario testing
const isCompat = Boolean(process.env.ENABLE_COMPAT_BUILD);

module.exports = {
  plugins: [
    [
      'ember-concurrency/async-arrow-task-transform',
      {}
    ],
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
      },
    ],
    [
      'babel-plugin-ember-template-compilation',
      {
        compilerPath: 'ember-source/dist/ember-template-compiler.js',
        enableLegacyModules: [
          'ember-cli-htmlbars',
          'ember-cli-htmlbars-inline-precompile',
          'htmlbars-inline-precompile',
        ],
        transforms: [
          ...(isCompat ? templateCompatSupport() : Macros.templateMacros),
        ],
      },
    ],
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: require.resolve('decorator-transforms/runtime-esm'),
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: __dirname,
        useESModules: true,
        regenerator: false,
      },
    ],
    ...(isCompat ? babelCompatSupport() : Macros.babelMacros),
  ],

  generatorOpts: {
    compact: false,
  },
};
