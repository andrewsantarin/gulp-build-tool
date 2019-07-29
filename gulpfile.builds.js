// @ts-check

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * A JavaScript build configuration.
 * 
 * @typedef JsBuildConfig
 * @type {Object}
 * @property {string[]} src A list of raw code files, relative to this configuration file.
 * @property {string} dest The name of the of bundled code file.
 * @property {string} destPath The location of the bundled code folder, relative to this configuration file.
 * @property {boolean} [uglify] _(optional)_ Should the code be minified for smaller size?
 * @property {boolean} [sourcemaps] _(optional)_ Should the code be given sourcemaps for debugging on the browser?
 */

/**
 * @type {JsBuildConfig[]}
 */
const jsConfigs = [
  {
    src: [
      'src/global.js', // app.js depends on this file, so make sure that this is listed first!
      'src/app.js'
    ],
    dest: 'app.js',
    destPath: 'dist',
    uglify: isProduction,
    sourcemaps: isDevelopment
  },
  {
    src: [
      'web/foo.js', // foobar.js depends on this file, so make sure that this is listed first!
      'web/foobar.js'
    ],
    dest: 'foobar.js',
    destPath: 'dist',
    uglify: isProduction,
    sourcemaps: isDevelopment
  }
  // ... To create more bundled outputs (e.g. script chunking), add, edit or remove copies of the above.
];

/**
 * A JavaScript build configuration.
 *
 * @typedef CssBuildConfig
 * @type {Object}
 * @property {string[]} src A list of raw code files, relative to this configuration file.
 * @property {string} dest The name of the of bundled code file.
 * @property {string} destPath The location of the bundled code folder, relative to this configuration file.
 * @property {boolean} [uglify] _(optional)_ Should the code be minified for smaller size?
 */

/**
 * @type {JsBuildConfig[]}
 */
const cssConfigs = [
  {
    src: [
      'src/**/*.css',
    ],
    dest: 'style.css',
    destPath: 'dist',
    uglify: isProduction,
  }
]

/**
 * @typedef GulpConfig
 * @type {Object}
 * @property {string} watchJsPath Which top-level directory should Gulp start watching changes in JavaScript for?
 * @property {JsBuildConfig[]} [js] A list of JavaScript build configurations.
 * @property {string} watchCssPath Which top-level directory should Gulp start watching changes in Cascading Style Sheets for?
 * @property {CssBuildConfig[]} [css] A list of Cascading Style Sheets build configurations.
 */

/**
 * @type {GulpConfig}
 */
const builds = {
  watchJsPath: 'src/**/*.js',
  js: jsConfigs,
  watchCssPath: 'src/**/*.css',
  css: cssConfigs,
};

module.exports = builds;
