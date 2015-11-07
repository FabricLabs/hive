'use strict';

import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

// live reload
import sync from 'browser-sync';

// css processors
import cssnext from 'cssnext';
import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';

let g = plugins();
const config = {
	src: {
		styles: 'src/css/app.css'
	},
	dest: {
		styles: 'public/css'
	},
	watch: {
		styles: 'src/css/**/*.css'
	}
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
		'styles'
	], done);
}

gulp.task('styles', styles);
gulp.task('default', build);
