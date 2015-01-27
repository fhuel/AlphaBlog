var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var del = require('del');

var version;

gulp.task('default', ['bundle']);
gulp.task('build', ['css', 'js', 'fonts', 'copyTheme', 'copyDocs']);

gulp.task('clean', function(cb) {
  del(['dist/**'], cb);
});

gulp.task('css', ['copyCSS', 'minifyCSS']);
gulp.task('js', ['copyJS', 'minifyJS']);

gulp.task('minifyCSS', ['clean'], function() {
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

gulp.task('copyCSS', ['clean'], function() {
  return gulp.src('css/*')
            .pipe(gulp.dest('dist/styles'));
});

gulp.task('minifyJS', ['clean'], function() {
  return gulp.src('scripts.js')
            .pipe(gulp.dest('dist'))
            .pipe(plugins.uglify({preserveComments: 'some'}))
            .pipe(plugins.rename({extname: '.min.js'}))
            .pipe(gulp.dest('dist'));
});

gulp.task('copyJS', ['clean'], function() {
  return gulp.src('js/*')
            .pipe(gulp.dest('dist/scripts'));
});

gulp.task('copyTheme', ['clean'], function() {
  return gulp.src('index.html')
            .pipe(gulp.dest('dist'));
});

gulp.task('fonts', ['clean'], function() {
  return gulp.src('fonts/*')
            .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copyDocs', ['clean'], function() {
  return gulp.src('../documentation/index.html')
            .pipe(plugins.rename('readme.html'))
            .pipe(gulp.dest('dist/'));
});

gulp.task('bundle', ['build'], function() {
  var target =  gulp.src('dist/**');
  return gulp.src('index.html')
            .pipe(plugins.prompt.prompt({
              type: 'input',
              name: 'version',
              message: 'Enter the version number: '
            }, function(res) {
              if (res.version) {
                target.pipe(plugins.zip('alphablog-' + res.version + '.zip'))
                      .pipe(gulp.dest('dist'));
              }
            }));
});