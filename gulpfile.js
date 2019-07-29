const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const sequence = require('gulp-sequence');

const builds = require('./gulpfile.builds');

const isProduction = process.env.node_env === 'production';

// References:
// - Compiler builds: https://stackoverflow.com/a/47475996/11455106
// - Task runners: https://stackoverflow.com/a/43713725/11455106
// - Browser live reload 1: https://stackoverflow.com/a/43463567/11455106
// - Browser live reload 2: https://stackoverflow.com/a/29382054/11455106

function compileCss(config) {
  // Find all the JS files in the given directories.
  let stream = gulp.src(config.src);

  // Concatenate them all together and set the filename to the one provided in the config.
  stream = stream.pipe(concat(config.dest));

  // Minify to .min.js to save space.
  if (config.uglify) {
    stream = stream
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }));
  }

  // Output to the config's target directory.
  stream.pipe(gulp.dest(config.destPath));

  return stream;
}

function compileJs(config) {
  // Find all the JS files in the given directories.
  let stream = gulp.src(config.src);

  // Start the sourcemaps plugin.
  if (config.sourcemaps) {
    stream = stream.pipe(sourcemaps.init());
  }

  // Concatenate them all together and set the filename to the one provided in the config.
  stream = stream.pipe(concat(config.dest));

  // Minify to .min.js to save space.
  if (config.uglify) {
    stream = stream
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }));
  }

  // Create sourcemaps.
  if (config.sourcemaps) {
    stream = stream.pipe(sourcemaps.write());
  }

  // Output to the config's target directory.
  stream.pipe(gulp.dest(config.destPath));

  return stream;
}

function build(callback) {
  let stream;

  builds.css.forEach(function compileCssByConfig(cssConfig) {
    stream = compileJs(cssConfig);
  });

  builds.js.forEach(function compileJsByConfig(jsConfig) {
    stream = compileJs(jsConfig);
  });

  // Return whatever stream to finish the whole build.
  return stream;
}

function watch(callback) {
  builds.css.forEach(function compileCssByConfig(cssConfig) {
    gulp.watch(builds.watchCssPath, function watchCompileCssByConfig() {
      return compileCss(cssConfig);
    });
  });

  builds.js.forEach(function compileJsByConfig(jsConfig) {
    gulp.watch(builds.watchJsPath, function watchCompileJsByConfig() {
      return compileJs(jsConfig);
    });
  });
}

// Register these tasks to the package script commands.
gulp.task('build', build);

gulp.task('watch', watch);

gulp.task('default', function (callback) {
  sequence('build', 'watch', callback);
});
