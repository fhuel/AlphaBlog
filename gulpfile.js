var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('default', ['css', 'js', 'fonts']);

gulp.task('css', function() {
  return gulp.src('style.css')
            .pipe(plugins.autoprefixer({
              browsers: ['last 2 versions']
            }))
            .pipe(plugins.pixrem())
            .pipe(gulp.dest('.'))
            .pipe(gulp.dest('dist'))
            .pipe(plugins.minifyCss({
              noRebase: true,
              keepSpecialComments: 0
            }))
            .pipe(plugins.rename({extname: '.min.css'}))
            .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src('scripts.js')
            .pipe(gulp.dest('dist'))
            .pipe(plugins.uglify())
            .pipe(plugins.rename({extname: '.min.js'}))
            .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
  return gulp.src('fonts/*')
            .pipe(gulp.dest('dist/fonts'));
});