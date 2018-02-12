const gulp = require("gulp");
// const debug = require("postcss-debug").createDebugger();

gulp.task("default", ["js", "css"], function() {
  const revReplace = require("gulp-rev-replace");
  const manifest = gulp.src("./public/assets/rev-manifest.json");

  return gulp
    .src("./src/views/index.pug")
    .pipe(revReplace({ manifest: manifest, replaceInExtensions: [".pug"] }))
    .pipe(gulp.dest("build/views"));
});

gulp.task("css", ["postcss"], function() {
  const rev = require("gulp-rev");

  return gulp
    .src("./public/assets/css/*.css", { base: "./public/assets" })
    .pipe(gulp.dest("./public/assets"))
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("./public/assets"));
});

gulp.task("js", function() {
  const uglify = require("gulp-uglify");
  return gulp
    .src("./public/src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./public/assets/js"));
});

gulp.task("postcss", function() {
  const postcss = require("gulp-postcss");
  const plugins = [
    require("postcss-import")(),
    require("postcss-assets")({
      basePath: "public/src/"
    }),
    require("postcss-nested"),
    require("postcss-custom-properties"),
    require("autoprefixer")({ browsers: ["last 2 years"] }),
    require("cssnano")({
      preset: ["default"],
      discardComments: {
        removeAll: true
      }
    })
  ];
  return gulp
    .src("./public/src/css/app.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./public/assets/css"));
});

gulp.task("postcss:dev", function() {
  const postcss = require("gulp-postcss");

  const plugins = [
    require("postcss-import")(),
    require("postcss-assets")({
      basePath: "public/src/"
    }),
    require("postcss-nested"),
    require("postcss-custom-properties")
  ];
  return gulp
    .src("./public/src/css/app.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("./public/assets/css"));
});

gulp.task("dev", ["nodemon"], function() {
  const browserSync = require("browser-sync");

  browserSync({
    proxy: "localhost:3000",
    port: 5000,
    notify: true
  });
});

gulp.task("nodemon", function(cb) {
  const nodemon = require("gulp-nodemon");
  const browserSync = require("browser-sync");

  let called = false;
  return nodemon({
    execMap: {
      js: "babel-node"
    },
    watch: ["src/", "public/src", "public/views"],
    ext: "js css pug",
    script: "src/bootstrap/index.js",
    tasks: ["postcss:dev", "js"]
  })
    .on("start", function() {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on("restart", function() {
      setTimeout(function() {
        browserSync.reload({ stream: false });
      }, 1000);
    });
});
