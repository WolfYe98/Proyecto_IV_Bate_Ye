var gulp = require('gulp');
var mocha = require('gulp-mocha');
var run= require('gulp-run');


//Tarea para testear el proyecto.
gulp.task('test', async function(){
  gulp.src('test')
  .pipe(mocha());
});

//Tarea para instalar las dependencias: aun que con npm install se puede hacer más fácil
gulp.task('install', async function(){
  gulp.src('./')
    .pipe(run('npm install'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', gulp.series('test'));
