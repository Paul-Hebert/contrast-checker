const gulp = require('gulp');
const betterRollup = require('gulp-better-rollup');
const rollup = require('rollup');

gulp.task("js", () => {
  const pipeline = gulp
    .src('scripts/*.js')
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
    .pipe(gulp.dest('transpiled-scripts'));
  return pipeline;
});

gulp.task('default', done => {
  // TODO: Process JS before watching
  gulp.watch(
      'scripts/**',
      gulp.series('js')
  );

  done();
});

