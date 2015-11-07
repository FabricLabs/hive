'use strict';

import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

// live reload
import sync from 'browser-sync';

// css processors
import cssnext from 'cssnext';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';

// browserify
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const config = {
	src: {
		styles: 'src/css/app.css',
		scripts: ['src/js/app.js']
	},
	dest: {
		styles: 'public/css',
		scripts: 'public/js'
	},
	watch: {
		styles: 'src/css/**/*.css'
	}
};

let g = plugins();
let bundler = browserify({
	entries: config.src.scripts,
	debug: true
});

bundler.transform(babelify);

function scripts() {
	return bundler.bundle()
		.on('error', function () {
			g.util.log(err.toString());
			this.emit('end');
		})
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest(config.dest.scripts));
}

function styles() {
	let processors = [
		cssnext(),
		atImport(),
		autoprefixer()
	];

	return gulp.src(config.src.styles)
		.pipe(g.postcss(processors))
		.pipe(gulp.dest(config.dest.styles));
}

function build(done) {
	g.sequence([
		'styles',
		'scripts'
	], done);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('default', build);
