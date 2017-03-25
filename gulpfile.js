const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const babelify = require('babelify');
const babel = require('gulp-babel');
const browserify = require('browserify');
const sassify = require('sassify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const livereload = require('gulp-livereload');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const fs = require('fs');

const paths = {
  clientEntrypoint: './client/app.js',
  clientBundleDir: './public/dist',
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

gulp.task('watch:server', ['compile:server'] , () => {
  nodemon({
    script: './dist/server.js',
    ext: 'js',
    watch: paths.serverSourceFiles,
    tasks: ['compile']
  });
});

gulp.task('compile:client', () => {
  browserify(paths.clientEntrypoint)
    .transform('babelify')
    .transform(sassify, {
      'auto-inject': true, // Inject css directly in the code
      base64Encode: false, // Use base64 to inject css
      sourceMap: false // Add source map to the code
    })
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.clientBundleDir))
    .pipe(livereload());
});

gulp.task('watch:client', ['compile:client'] , () => {
  livereload.listen();
  gulp.watch(paths.clientSourceFiles , ['compile:client']);
});

gulp.task('specs', () => {
  process.env.PORT = 8001;
  return gulp
    .src(paths.specSourceFiles)
    .pipe(mocha({
      reporter: 'nyan',
      require: './specs/require.js',
      colors: true
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

gulp.task('serve', ['watch:client', 'watch:server']);

gulp.task('commit', ['eslint', 'specs']);

gulp.task('default', ['serve']);
