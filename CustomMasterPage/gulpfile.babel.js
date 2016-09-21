// generated on 2016-09-10 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

//a list of all JS source to pull into header
var jsSrc = [
	'app/scripts/jquery-2.2.3.min.js',
	'app/scripts/debounce.js',
	'app/scripts/pxlml.console.js',
	'app/scripts/pxlml.mobileui.js',
	'app/scripts/pxlml.wiki.js',
	'app/scripts/custom.header.js'
];

//compile sass into final css
gulp.task('styles', () => {
  return gulp.src('./app/styles/*.scss', {base:'app/styles'})
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ["app/styles","app/styles/**/*.scss"]
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write()) //comment this line if sourcemaps not needed
    .pipe($.concat('style.css'))
    .pipe(gulp.dest('./solution/templates/SiteAssets'))
    .pipe(reload({stream: true}));
});

//bring together all script files
gulp.task('scripts', function() {
  gulp.src(jsSrc)
    .pipe($.concat('header.js'))
//    .pipe($.uglify({
//      "mangle": false,
//      "compress": false,
//      "preserveComments": "all"
//    }))
    .pipe(gulp.dest('./solution/templates/SiteAssets'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['scripts', 'styles'], () => {
  browserSync({
    notify: false,
    ui: false,
    open:false,
    server: {
      baseDir: ['app'],
      routes: {
        '/SiteAssets': './solution/templates/SiteAssets'
      }
    },
    https: true
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['clean'], () => {
  //gulp.start('serve');
});
