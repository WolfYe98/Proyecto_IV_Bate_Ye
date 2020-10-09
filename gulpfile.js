var gulp = require('gulp');
var mocha = require('gulp-mocha');
gulp.task('default', gulp.series('test'));
gulp.task('test', async function(){
  gulp.src('test')
  .pipe(mocha());
});
