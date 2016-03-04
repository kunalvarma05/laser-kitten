'use strict';

var gulp = require('gulp');
var utils = require('./utils');

var releaseForOs = {
    osx: require('./release_osx'),
    linux: require('./release_linux'),
    windows: require('./release_windows'),
};

gulp.task('release', ['clean', 'cleanRelease', 'copy'], function () {
    return releaseForOs[utils.os()]();
});
