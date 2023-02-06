/**
 * Created by Sergey on 27.04.2016.
 */

/*===========GULP==============*/

const gulp = require('gulp'),
	plumber = require('gulp-plumber'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
   	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	zip = require('gulp-zip'),
	replace = require('gulp-replace'),
	sourcemaps = require('gulp-sourcemaps'),
	cache = require('gulp-cache');


/*===========Compile SCSS==============*/

gulp.task('sass', function(cb) {

    gulp.src('html/sass/base/*.scss')
		.pipe(sourcemaps.init())
        .pipe(sass(
			{
				linefeed: "crlf"
			}
		))
		.pipe(prefixer(
			{
				browsers: ['last 12 versions'],
				cascade: false
			}
		))
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('html/css'));

    gulp.src('html/sass/blocks/*.scss')
		.pipe(sourcemaps.init())
        .pipe(sass(
			{
				linefeed: "crlf"
			}
		))
		.pipe(prefixer(
			{
				browsers: ['last 12 versions'],
				cascade: false
			}
		))
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('html/css'));

    gulp.src('html/sass/layouts/*.scss')
		.pipe(sourcemaps.init())
        .pipe(sass(
			{
				linefeed: "crlf"
			}
		))
		.pipe(prefixer(
			{
				browsers: ['last 12 versions'],
				cascade: false
			}
		))
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('html/css'));

    gulp.src('html/sass/modules/*.scss')
		.pipe(sourcemaps.init())
        .pipe(sass(
			{
				linefeed: "crlf"
			}
		))
		.pipe(prefixer(
			{
				browsers: ['last 12 versions'],
				cascade: false
			}
		))
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('html/css'));
    
    gulp.src('html/sass/widgets/*.scss')
		.pipe(sourcemaps.init())
        .pipe(sass(
			{
				linefeed: "crlf"
			}
		))
		.pipe(prefixer(
			{
				browsers: ['last 12 versions'],
				cascade: false
			}
		))
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('html/css'))

        .pipe(plumber())
        .pipe(sass({errLogToConsole: true}))
        .pipe(browserSync.reload({
            stream: true
        }));
	cb();
});


/*===========Watch==============*/

gulp.task('watch', function(cb) {

	browserSync.init({
		server: "html"
	});

	gulp.watch('html/sass/**/*.scss', gulp.series('sass'));
	cb();
});


/*===========Minimization IMAGE==============*/

gulp.task('images', function (cb) {
	gulp.src('html/img/**/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(cache(imagemin({
			interlaced: true
		})))
		.pipe(gulp.dest('html/img'));
	cb();
});

gulp.task('compress', function(cb) {
    gulp.src('html/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('html/img'));
    cb();
});


/*=============Join tasks==============*/

gulp.task('default', gulp.parallel('sass', 'watch'));

gulp.task('build', gulp.series( 'sass', 'images'));

