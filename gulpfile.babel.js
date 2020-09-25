import gulp from "gulp";
import Gpug from "gulp-pug";
import del from "del";

const routes = {
  delete : './build',
  pug : {
    src : './src/*.pug',
    dest : './build'
  }
};

const task_pug = () => 
  gulp
    .src(routes.pug.src)
    .pipe(Gpug())
    .pipe(gulp.dest(routes.pug.dest));

const task_del = () => del(routes.delete);



const prepare = gulp.series([task_del]);
const assets = gulp.series([task_pug]);

export const dev = gulp.series([prepare ,assets]);