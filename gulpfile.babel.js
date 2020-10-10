import gulp, { watch } from "gulp";
import Gpug from "gulp-pug";
import del from "del";
import Gws from "gulp-webserver";


const routes = {
  delete : './build',
  pug : {
    src : './src/*.pug',
    dest : './build',
    watch : './src/**/*.pug'
  },
  webserver : './build'
};

const task_del = () => del(routes.delete);

const task_pug = () => 
  gulp
    .src(routes.pug.src)
    .pipe(Gpug())
    .pipe(gulp.dest(routes.pug.dest));

const task_webserver = () => 
  gulp
    .src(routes.webserver)
    .pipe(Gws({livereload:true, open:true})); 

const task_watch = () =>
  gulp
    .watch(routes.pug.watch, task_pug);

const prepare = gulp.series([task_del]);
const assets = gulp.series([task_pug]);
const postDev = gulp.series([task_webserver,task_watch]);

export const dev = gulp.series([prepare ,assets, postDev]);