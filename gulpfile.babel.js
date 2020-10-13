import gulp, { dest, watch } from "gulp";
import Gpug from "gulp-pug";
import del from "del";
import Gws from "gulp-webserver";
import Gimg from "gulp-image";
import Gsass from "gulp-sass";
import Gautoprefixer from "gulp-autoprefixer";
import Gcsso from "gulp-csso";
import Gbro from "gulp-bro";
import babelify from "babelify";

Gsass.compiler = require('node-sass');


const routes = {
  delete : './build',
  pug : {
    src : './src/*.pug',
    dest : './build',
    watch : './src/**/*.pug'
  },
  webserver : './build',
  img : {
    src : './src/img/*',
    dest : './build/img'
  },
  scss : {
    src : './src/scss/style.scss',
    dest : './build/css',
    watch : './src/scss/*.scss'
  },
  js : {
    src : './src/js/main.js',
    dest : './build/js',
    watch : './src/js/**/*.js'
  }
};


const task_del = () => del(routes.delete);

const task_pug = () => 
  gulp
    .src(routes.pug.src)
    .pipe(Gpug())
    .pipe(gulp.dest(routes.pug.dest));

const task_image = () =>
  gulp
    .src(routes.img.src)
    .pipe(Gimg())
    .pipe(gulp.dest(routes.img.dest));

const task_scss = () =>
  gulp
    .src(routes.scss.src)
    .pipe(Gsass().on('error', Gsass.logError))
    .pipe(Gautoprefixer({cascade: false, overrideBrowserslist:["last 2 versions"]}))
    .pipe(Gcsso())
    .pipe(dest(routes.scss.dest));
    
const task_js = () =>
  gulp
    .src(routes.js.src)
    .pipe(Gbro({
      transform: [
        babelify.configure({ presets: ['@babel/preset-env'] }),
        [ 'uglifyify', { global: true } ]
      ]
    }))
    .pipe(dest(routes.js.dest));

const task_webserver = () => 
  gulp
    .src(routes.webserver)
    .pipe(Gws({livereload:true, open:true})); 

const task_watch = () => 
  gulp.watch(routes.pug.watch, task_pug);
  gulp.watch(routes.scss.watch, task_scss);
  gulp.watch(routes.js.watch, task_js);

const prepare = gulp.series([task_del]);
const assets = gulp.series([task_pug, task_image, task_scss, task_js]);
const postDev = gulp.parallel([task_webserver,task_watch]);


export const dev = gulp.series([prepare ,assets, postDev]);