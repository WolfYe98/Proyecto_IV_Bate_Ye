var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', async function(){
  gulp.src('test')
  .pipe(mocha());
});
