var gulp        = require('gulp');
var consolidate = require('gulp-consolidate');
var rename      = require('gulp-rename');
var fs          = require('fs');
var path        = require('path');
var config      = require('../../config');
var allowExt    = ['.html', '.jade', '.nunj', '.nunjucks', '.swig'];

gulp.task('index-page', function() {
    var fullList = fs.readdirSync(config.src.templates);
    var pages = fullList.reduce(function(acc, val) {
        var parsed = path.parse(val);
        var name = parsed.name;
        var ext = parsed.ext;
        if (~allowExt.indexOf(ext)) {
            return acc.concat(name + '.html');
        }
        return acc;
    }, []);

    return gulp
        .src(__dirname + '/_index.html')
        .pipe(consolidate('lodash', {
            pages: pages
        }))
        .pipe(rename({ basename: config.indexPageName }))
        .pipe(gulp.dest(config.dest.root));
});
