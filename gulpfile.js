const gulp = require('gulp'),
  webpack = require('webpack'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create()

/* ========== develop ========== */

// webpack
gulp.task('webpack', function (cb) {
  webpack(require('./webpack.config.js'), function (err) {
    if (err) return cb(err)
    cb()
  })
})

// sass
gulp.task('sass', function () {
  return gulp.src(['./src/scss/style.scss', './src/scss/mobile.scss'])
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./source/css/'))
})

// browser-sync
// watch js
gulp.task('reload-js', gulp.series('webpack', async (done) => {
  browserSync.reload()
  done()
}))
// watch sass
gulp.task('reload-css', gulp.series('sass', async (done) => {
  browserSync.reload()
  done()
}))
// watch layout
gulp.task('reload-layout', async (done) => {
  browserSync.reload()
  done()
})
// watch _config
gulp.task('reload-config', async (done) => {
  browserSync.reload()
  done()
})

gulp.task('dev', gulp.series(['webpack', 'sass'], function () {
  browserSync.init({
    proxy: 'localhost:4000'
  })
  gulp.watch(['./src/js/**/*.js'], async (done) => {
    browserSync.reload()
    done()
  })
  gulp.watch(['./src/scss/**/*.scss'], async (done) => {
    browserSync.reload()
    done()
  })
  gulp.watch(['./layout/**/*.ejs'], async (done) => {
    browserSync.reload()
    done()
  })
  gulp.watch(['./_config.yml'], async (done) => {
    browserSync.reload()
    done()
  })
}))


/* ========== bulid ========== */

// webpack-prod
gulp.task('webpack-prod', function (cb) {
  webpack(require('./webpack.prod.js'), function (err) {
    if (err) return cb(err)
    cb()
  })
})

gulp.task('build', gulp.series(['sass', 'webpack-prod'], async () => {
  console.log(process.argv)
}))