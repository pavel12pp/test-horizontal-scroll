/*-- LIBS --*/
const gulp = require("gulp");
/*
  CLEAN 
*/
const clean = require("gulp-clean");
const fs = require("fs"); //систменые функции
/* 
  HTML HANDLER 
  DOCS:
    htmlmin -> https://github.com/kangax/html-minifier?tab=readme-ov-file
    file-include -> https://github.com/haoxins/gulp-file-include
*/
const fileInclude = require("gulp-file-include");
const htmlMin = require('gulp-htmlmin');
/*
  SCSS 
  DOCS:
    sass(gulp) -> https://github.com/dlmanning/gulp-sass
    sass-glob -> https://github.com/mikevercoelen/gulp-sass-glob
*/
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
/*
  CSS 
  DOCS:
    group-css-media-queries -> https://github.com/avaly/gulp-group-css-media-queries
    sourcemaps -> https://github.com/gulp-sourcemaps/gulp-sourcemaps
    autoprefixer -> https://github.com/postcss/autoprefixer#options
    csso -> https://github.com/ben-eb/gulp-csso
*/
const sourceMaps = require("gulp-sourcemaps");
const csso = require('gulp-csso');
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const autoprefixer = require("gulp-autoprefixer");
/*
  JS 
  DOCS:
    webpack -> https://github.com/shama/webpack-stream
    babel -> https://babeljs.io/docs/options
*/
const webpack = require("webpack-stream");
const babel = require("gulp-babel");
/*
  asset
  DOCS:
    webp -> https://github.com/sindresorhus/gulp-webp
    imagemin -> https://github.com/sindresorhus/gulp-imagemin
*/
const imageWebp = require("gulp-webp");
const imageMin = require('gulp-imagemin');
/*
  LOCAL SERVER 
*/
const browserSync = require('browser-sync').create();
/*
  Additionally
*/
const changed = require("gulp-changed");

/*-- CONFIGS --*/
/* HTML */
const fileIncludeConfig = {
  prefix: "@@",
  basebath: "@file",
}
const htmlMinConfig = {
  collapseWhitespace: true, //Убирает пустое пространство между элементами
}
/* LOCAL SERVER */
const browserSyncConfig = {
  watch: true,
  server: {
      baseDir: "./build/",
  }
}

/* GULP TASKS */

/* Additionally */
gulp.task("image:prod", function(done) {
  /* РАБОТА С ИЗОБРАЖЕНИЯМИ ИЗ ПАПКИ asset/image */
  /* 
   -->changed - позволяет исключить неизменившиеся файлы
   -->imageWebp - дублирует изображения в формате webp
   -->imageMin - оптимизирует размер изображения
  */
  return gulp
    .src("./src/asset/image/**/*") //Копируем изображения конвертируя в webp
    .pipe(changed("./build/img/"))
    .pipe(imageWebp())
    .pipe(imageMin())
    .pipe(gulp.dest("./build/img/"))
    .pipe(gulp.src("./src/asset/image/**/*")) //Дублируем изображения не в webp
    .pipe(changed("./build/img/"))
    .pipe(imageMin())
    .pipe(gulp.dest("./build/img/"));
})
gulp.task("move-asset:prod", function(done) {
  /* ПЕРЕМЕЩЕНИЕ ФАЙЛОВ ИЗ ПАПКИ asset */
  gulp.src("./src/asset/icon/**/*").pipe(changed("./build/icon/")).pipe(gulp.dest("./build/icon/"));
  gulp.src("./src/asset/font/**/*").pipe(changed("./build/font/")).pipe(gulp.dest("./build/font/"));
  gulp.src("./src/asset/video/**/*").pipe(changed("./build/video/")).pipe(gulp.dest("./build/video/"));
  gulp.src("./src/asset/file/**/*").pipe(changed("./build/file/")).pipe(gulp.dest("./build/file/"));
  gulp.src("./src/asset/favicon.ico").pipe(changed("./build/")).pipe(gulp.dest("./build/"));
  done()
})


/* Main */
gulp.task("clean:prod", function(done) {
  /* ОЧИСТКА ДИРЕКТОРИИ САЙТА */
  if (fs.existsSync("./build/")) {
    return gulp.src("./build/").pipe(clean());
  }
  done()
})
gulp.task("template:prod", function() {
  /* РАБОТА С ФАЙЛАМИ ИЗ ПАПКИ TEMPLATE */
  /*
   -->changed позволяет исключить неизменившиеся файлы
   -->fileInclude позволяет собирать один html из других шаблонов с помощью директивы include
   -->htmlMin минифицирует html
  */
  return gulp
    .src([
      "./src/template/source/**/*.html",
    ])
    .pipe(changed("./build/", {hasChanged: changed.compareContents}))
    .pipe(fileInclude(fileIncludeConfig))
    .pipe(htmlMin(htmlMinConfig))
    .pipe(gulp.dest("./build/"));
})
gulp.task("style:prod", function() {
  /* РАБОТА С ФАЙЛАМИ ИЗ ПАПКИ STYLE */
  /*
   -->changed - позволяет исключить неизменившиеся файлы
   -->sass - компилирует scss в css
   -->sourcemaps - !!! Все библиотеки используемые между функциями init() и write() sourcemap должны поддерживаться (AUTOPREFIXER и GROUPMEDIAQUERIES не поддерживаются)!!! создаёт исходные карты для css чтобы после компиляции из препроцессора была удобно ориентироваться в коде(для отладки
   -->groupCssMediaQueries - группирует css медиа запросы(не поддерживается sourcemaps)
   -->autoprefixer - добавляет теги с вендорными префиксами(не поддерживается sourcemaps) 
  */
  return gulp
    .src([
      "./src/style/source/**/*.scss",
    ])
    .pipe(changed("./build/css/"))
    .pipe(sassGlob()) // НЕ РАБОТАЕТ ВМЕСТЕ С SOURCEMAP
    // .pipe(sourceMaps.init())
    .pipe(sass()).on("error", sass.logError)
    .pipe(autoprefixer()) // НЕ РАБОТАЕТ ВМЕСТЕ С SOURCEMAP
    // .pipe(groupCssMediaQueries()) // НЕ РАБОТАЕТ ВМЕСТЕ С SOURCEMAP
    .pipe(csso())
    // .pipe(sourceMaps.write())
    .pipe(gulp.dest("./build/css/"));
})
gulp.task("script:prod", function() {
  /* РАБОТА С ФАЙЛАМИ ИЗ ПАПКИ SCRIPT */
  /*
   -->babel - делает код совместимым с более поздними версиями
   -->webpack - собирает js модули
  */
  return gulp
    .src([
      "./src/script/source/**/*.js",
    ])
    // .pipe(babel()) крашит сборку при любой ошибке
    .pipe(webpack(require("./../webpack.config.js")))
    .pipe(gulp.dest("./build/js"))
})
gulp.task("asset:prod", gulp.parallel("image:prod", "move-asset:prod"))

/* Server */
gulp.task('server:prod', function() {
  browserSync.init(browserSyncConfig);
});
/* Watch */
gulp.task("watch:prod", function(done) {
  gulp.watch("./src/asset/**/*", gulp.series("asset:prod"));
  gulp.watch("./src/template/**/*.html", gulp.series("template:prod"));
  gulp.watch("./src/style/**/*.scss", gulp.series("style:prod"));
  gulp.watch("./src/script/**/*.js", gulp.series("script:prod"));
  done();
})



