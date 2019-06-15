const gulp = require('gulp');
const clean = require('gulp-clean');

const betterRollup = require('gulp-better-rollup');
const rollup = require('rollup');

const browserSync = require('browser-sync').create();

gulp.task("js", done => {
  const destinations = [
    'dist/pwa/scripts', 'dist/extension/scripts'
  ]

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
              require('rollup-plugin-babel')(),
            ],
          },
          {
            format: 'iife',
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
      .src(`app/styles/**/*.*`)
      .pipe(gulp.dest(`dist/${destination}/styles`));

    gulp
      .src(`app/icons/**/*.*`)
      .pipe(gulp.dest(`dist/${destination}/icons`));

    gulp
      .src(`app/index.html`)
      .pipe(gulp.dest(`dist/${destination}`));
  });

  done();
});

gulp.task('serve', function() {
  browserSync.init({
      server: {
          baseDir: "./dist/pwa"
      }
  });
});

gulp.task('reload', done => {
  browserSync.reload();
  done();
});

gulp.task('clean', () => {
  return gulp
    .src('dist', {
      allowEmpty: true,
      read: false,
    })
    .pipe(clean());
});

gulp.task('build', gulp.series('clean', gulp.parallel('js', 'content')));

gulp.task('watch', done => {
  gulp.watch(
      'app/scripts/**',
      gulp.series('js', 'reload')
  );

  gulp.watch(
    [
      'app/extension/**',
      'app/pwa/**',
      'app/icons/**',
      'app/styles/**',
      'app/index.html'
  ],
    gulp.series('content', 'reload')
  );
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));

