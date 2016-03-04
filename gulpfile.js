var gulp = require('gulp');
var chalk = require('chalk');
var moment = require('moment');

var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');

var less = require('gulp-less');
var concat = require('gulp-concat');

var jetpack = require('fs-jetpack');


require('./tasks/release');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var buildDir = projectDir.cwd('./build');
var releaseDir = projectDir.cwd('./releases');

function log(action, identifier, txt) {
    var identifier = chalk.cyan(identifier);
    var now = moment().format("HH:mm:ss");
    var lead = "[" + chalk.grey(now) + "]";
    if(!txt) {
        txt = '';
    }
    console.log(lead + " " + action + " '" + identifier + "'..." + txt);

}


// -------------------------------------
// React / JSX
// -------------------------------------

gulp.task('browserify', function() {
    var bundler = browserify({
        debug: false,
        entries: ['./app/app.jsx'],
        transform: [reactify],
        extensions: ['.jsx', '.js'],
        cache: {}, packageCache: {}, fullPaths: true
    });

    var watcher  = watchify(bundler);

    watcher.on('update', function () {
        log('Starting', 'browserify');
        var updateStart = Date.now();
        rebbuild();
        var ms = chalk.magenta((Date.now() - updateStart) + " ms");        
        log('Finishing', 'browserify', 'after ' + ms);
    });
            
    function rebbuild() {
        return watcher
            .bundle()
            .on('error', function (err) {
                console.error();
                console.error(chalk.red('[ERROR]'));
                console.error('     ' + err.name + ' : ' + err.description);
                console.error('     ' + err.fileName + ' on line ' + err.lineNumber);
                console.error('     ' + err.stack);
                console.error();
             })
            .pipe(plumber())
            .pipe(source('app.js'))
            .pipe(gulp.dest('./static/js'));
    }
    rebbuild();    
});

// -------------------------------------
// LESS
// -------------------------------------

gulp.task('less', function() {
    function rebbuild() {
        return gulp
            .src('./static/less/main.less')
            .pipe(plumber())
            .pipe(less())
            .pipe(concat('main.css'))
            .pipe(gulp.dest('./static/css'));
    }

    rebbuild();

    gulp.watch('./static/less/**/*', function () {
        log('Starting', 'less');
        var updateStart = Date.now();
        rebbuild();
        var ms = chalk.magenta((Date.now() - updateStart) + " ms");        
        log('Finishing', 'less', 'after ' + ms);
    });
});


// -------------------------------------
// Build for release
// -------------------------------------

gulp.task('cleanBuild', function (callback) {
    return buildDir.dirAsync('.', { empty: true });
});

gulp.task('cleanRelease', function (callback) {
    return releaseDir.dirAsync('.', { empty: true });
});


var copyTask = function () {
    projectDir.copy('.', buildDir.path(), {
        overwrite: true,
        matching: [
            './app.js',
            './app-menu.js',
            './index.html',
            './static/css/**',
            './static/js/**'
        ]
    });

    projectDir.copy('app', buildDir.path(), {
        overwrite: true,
        matching: [
            './package.json',
            './node_modules/**',
        ]
    });

    return true;
};

gulp.task('copyTask', copyTask);


// -------------------------------------
// Commands
// -------------------------------------

gulp.task('build', ['browserify', 'less']);
gulp.task('clean', ['cleanBuild', 'cleanRelease']);
gulp.task('copy', ['clean', 'copyTask']);
gulp.task('default', ['build']);