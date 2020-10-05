import gulp from "gulp";
import Gpug from "gulp-pug";
import del from "del";
import Gws from "gulp-webserver";


const routes = {
  delete : './build',
  pug : {
    src : './src/*.pug',
    dest : './build'
  }
};

const task_del = () => del(routes.delete);

const task_pug = () => 
  gulp
    .src(routes.pug.src)
    .pipe(Gpug())
    .pipe(gulp.dest(routes.pug.dest));

const task_webserver = () => 
  gulp
    .src('./build')
    .pipe(Gws({livereload:true, open:true})); 


const prepare = gulp.series([task_del]);
const assets = gulp.series([task_pug]);

export const dev = gulp.series([prepare ,assets, task_webserver]);