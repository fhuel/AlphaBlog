var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var del = require('del');

gulp.task('default', ['css', 'js', 'fonts']);

gulp.task('clean', function(cb) {
  del(['dist/**'], cb);
});

gulp.task('css', ['clean'], function() {
  return gulp.src('style.css')
            .pipe(plugins.autoprefixer({
              browsers: ['last 2 versions']
            }))
            .pipe(gulp.dest('dist'))
            .pipe(plugins.minifyCss({
              noRebase: true,
              keepSpecialComments: 0
            }))
            .pipe(plugins.rename({extname: '.min.css'}))
            .pipe(gulp.dest('dist'));
});

gulp.task('js', ['clean'], function() {
  return gulp.src('scripts.js')
            .pipe(gulp.dest('dist'))
            .pipe(plugins.uglify({preserveComments: 'some'}))
            .pipe(plugins.rename({extname: '.min.js'}))
            .pipe(gulp.dest('dist'));
});

gulp.task('fonts', ['clean'], function() {
  return gulp.src('fonts/*')
            .pipe(gulp.dest('dist/fonts'));
});