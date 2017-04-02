const fs = require('fs');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const livereload = require('gulp-livereload');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const util = require('gulp-util');
const sequence = require('gulp-sequence');

const paths = {
  clientEntrypoint: './client/app.js',
  clientBundleDir: './public',
  clientJsSourceFiles: [
    './client/**/*.js',
  ],
  clientSourceFiles: [
    './client/**/*.js',
    './client/**/*.scss',
    './client/**/*.sass',
  ],

  serverBuildDir: './dist',
  serverSourceFiles : [
    './server/**/*.js'
  ],

  specSourceFiles: [
    './server/**/*.spec.js',
    './client/**/*.spec.js',
  ]
};

const babelConfig = {
  presets: ['es2017', 'react', 'stage-3']
};

gulp.task('compile:server', () => {
  return gulp
    .src(paths.serverSourceFiles)
    .pipe(babel())
    .pipe(gulp.dest(paths.serverBuildDir))
});

gulp.task('watch:server' , () => {
  nodemon({
    script: 'dist/server.js',
    ext: 'js',
    watch: paths.serverSourceFiles,
    tasks: ['compile:server']
  });
});

gulp.task('compile:client', (done) => {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');

  return webpack(webpackConfig())
    .run(done);
});

gulp.task('watch:client', ['compile:client'] , () => {
  gulp.watch(paths.clientSourceFiles , ['compile:client']);
});

gulp.task('specs', () => {
  const reporter = util.env.reporter || 'nyan';
  return gulp
    .src(paths.specSourceFiles)
    .pipe(mocha({
      reporter: reporter,
      require: './specs/require.js',
      colors: true,
      watch: !!util.env.watch
    }));
});

gulp.task('eslint', () => {
  return gulp
    .src(paths.serverSourceFiles.concat(paths.clientJsSourceFiles))
    .pipe(eslint({
      configFile: './.eslintrc.js',
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', ['watch:client', 'watch:server']);

gulp.task('commit', ['eslint', 'specs']);

gulp.task('build', ['compile:client', 'compile:server']);

gulp.task('serve', sequence('compile:server', 'watch:server'));

gulp.task('default', ['watch']);
