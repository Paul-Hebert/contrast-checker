const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const handlebars = require('gulp-compile-handlebars');

const helpers = require('@cloudfour/hbs-helpers');

const betterRollup = require('gulp-better-rollup');
const rollup = require('rollup');

const browserSync = require('browser-sync').create();

gulp.task('js', done => {
  const destinations = ['dist/pwa/scripts', 'dist/extension/scripts'];

  destinations.forEach(destination => {
    gulp
      .src('app/scripts/*.js')
      .pipe(
        betterRollup(
          {
            rollup,
            plugins: [
              require('rollup-plugin-node-resolve')(),
              require('rollup-plugin-commonjs')(),
              require('rollup-plugin-babel')()
            ]
          },
          {
            format: 'iife'
          }
        )
      )
      .pipe(gulp.dest(destination));
  });

  done();
});

gulp.task('content', done => {
  const destinations = ['extension', 'pwa'];

  destinations.forEach(destination => {
    gulp
      .src(`app/${destination}/**/*.*`)
      .pipe(gulp.dest(`dist/${destination}`));

    gulp
      .src(`app/styles/app/**/*.*`)
      .pipe(gulp.dest(`dist/${destination}/styles`));

    gulp.src(`app/icons/**/*.*`).pipe(gulp.dest(`dist/${destination}/icons`));

    gulp
      .src('app/markup/index.hbs')
      .pipe(
        handlebars(
          {
            mode: destination
          },
          {
            helpers
          }
        )
      )
      .pipe(rename('index.html'))
      .pipe(gulp.dest(`dist/${destination}`));
  });

  gulp
    .src('app/markup/easy-start.hbs')
    .pipe(handlebars())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));

  gulp.src(`app/styles/easy-start/**/*.*`).pipe(gulp.dest(`dist/styles`));

  done();
});

gulp.task('serve', done => {
  browserSync.init({
    notify: false,
    server: './dist'
  });

  done();
});

gulp.task('reload', done => {
  browserSync.reload();
  done();
});

gulp.task('clean', () => {
  return gulp
    .src('dist', {
      allowEmpty: true,
      read: false
    })
    .pipe(clean());
});

gulp.task('build', gulp.series('clean', gulp.parallel('js', 'content')));

gulp.task('watch', done => {
  gulp.watch('app/scripts/**', gulp.series('js', 'reload'));

  gulp.watch(
    [
      'app/extension/**',
      'app/pwa/**',
      'app/icons/**',
      'app/styles/**',
      'app/markup/**',
      'app/index.html'
    ],
    gulp.series('content', 'reload')
  );

  done();
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
