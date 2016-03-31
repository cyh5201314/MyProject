var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var sass = require('gulp-sass');
// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    //jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息
//var scss = require('gulp-scss-lint');

var jadeFiles = [
    {src: './public/partials/list.jade', dest: './public/partials/'},
    {src: './public/templates/index.jade', dest: './public/templates/'}
];

gulp.task('jade', function(){
    jadeFiles.forEach(function(jf){
        if(!jf.src || !jf.dest) return;
        gulp.src(jf.src)
            .pipe(jade({petty: true}))
            .pipe(gulp.dest(jf.dest));
    });
});
// 压缩html
gulp.task('html', function() {
    return gulp.src('public/templates/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public/dest/templates'))
        .pipe(notify({message: 'html task ok'}));
});
// 压缩图片
gulp.task('img', function() {
    return gulp.src('/public/src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('public/dest/images/'))
        .pipe(notify({ message: 'img task ok' }));
});
// 合并、压缩、重命名css
gulp.task('css', function() {
    return gulp.src('public/src/stylesheets/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/dest/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/dest/css'))
        .pipe(notify({ message: 'css task ok' }));
});
// 合并、压缩js文件
gulp.task('js', function() {
    return gulp.src('public/src/js/app/**/*.js')
        //.pipe(concat('all.js'))
        //.pipe(gulp.dest('dest/js'))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/dest/js/app'))
        .pipe(notify({ message: 'js task ok' }));
});
// 编译less
gulp.task('less',function(){
	gulp.src('public/stylesheets/less/*.less')
	.pipe(less())
	.pipe(gulp.dest('public/stylesheets/css'))
});
//编译sass
gulp.task('sass',function(){
	gulp.src('public/stylesheets/sass/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('public/stylesheets/css'))
});
// 编译scss
/*gulp.task('scss',function(){
	return gulp.src('public/stylesheets*//*.scss')
    .pipe(scss({
		bundleExec :true
	}))
	.pipe(gulp.dest('public/stylesheets'))
});*/
gulp.task('watch', function(){
    //gulp.watch('./public/partials/*.jade',['jade']);
	gulp.watch('./public/stylesheets/**/*.less',['less']);
	gulp.watch('./public/stylesheets/**/*.sass',['sass']);
	//gulp.watch('./public/stylesheets/*.scss',['scss']);
});
gulp.task('default',['watch'])
