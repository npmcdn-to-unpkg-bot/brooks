var gulp         = require('gulp');
var iconfont     = require('gulp-iconfont');
var consolidate  = require('gulp-consolidate');
var _            = require('lodash');
var config       = require('../../config');
var pathToIcons  = config.src.iconsFont + '/**/*.svg';
// var runTimestamp = Math.round(Date.now() / 1000);

var fontProps = {
    fontName: 'iconfont',
    fontPath: '../fonts/',
    className: 'icon'
};

gulp.task('iconfont', function() {
    return gulp.src(pathToIcons)
        .pipe(iconfont({
            fontName: fontProps.fontName,
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            // appendUnicode: true,
            // timestamp: runTimestamp,
            normalize: true,
            fontHeight: 1001,
            fontStyle: 'normal',
            fontWeight: 'normal'
        }))
        .on('glyphs', function(glyphs, options) {
            props = _.assign(fontProps, { glyphs: glyphs });
            gulp.src(__dirname + '/_iconfont.scss')
                .pipe(consolidate('lodash', props))
                .pipe(gulp.dest(config.src.sassGen));
            // generate icons preview in development mode
            gulp.src(__dirname + '/iconfont-preview.html')
                .pipe(consolidate('lodash', props))
                .pipe(gulp.dest(config.src.root));
        })
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('iconfont:watch', function() {
    gulp.watch(pathToIcons, ['iconfont']);
});
