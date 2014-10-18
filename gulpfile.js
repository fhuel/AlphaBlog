var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(plugins.webserver({
            livereload: true,
            open: true,
            host: '0.0.0.0',
            fallback: 'index.html'
        }))
});

gulp.task('default', function() {
    gulp.start('webserver');
});