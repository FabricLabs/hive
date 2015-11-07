'use strict';

import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

// live reload
import sync from 'browser-sync';
import http from 'http';

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
import assign from 'lodash.assign';

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
		styles: 'src/css/**/*.css',
		scripts: 'src/js/**/*.js'
	},
	server: {
		entry: 'hive:web.js',
		host: 'localhost',
		port: 6333
	}
};

let g = plugins();
let opts = assign({}, watchify.args, {
	entries: config.src.scripts,
	debug: true
});
let bundler = browserify(opts);

bundler.transform(babelify);
bundler.on('log', g.util.log);

function scripts() {
	return bundler.bundle()
		.on('error', function () {
			g.util.log(err.toString());
			this.emit('end');
		})
		.pipe(source('hive.js'))
		.pipe(buffer())
		.pipe(gulp.dest(config.dest.scripts))
		.pipe(sync.reload({stream: true}));
}

function styles() {
	let processors = [
		cssnext(),
		atImport(),
		autoprefixer()
	];

	return gulp.src(config.src.styles)
		.pipe(g.postcss(processors))
		.pipe(gulp.dest(config.dest.styles))
		.pipe(sync.reload({stream: true}));
}

function build(done) {
	g.sequence([
		'styles',
		'scripts'
	], done);
}

function nodemon(done) {
	g.nodemon({
		script: config.server.entry,
		watch: ['lib/', 'resources/'],
		ext: 'js html'
	}).once('start', function() {
		// the server might not be up so let's checkIfUp
		checkIfUp(done);
	});
}

function checkIfUp(done) {
	let opts = {
		hostname: config.server.host,
		port: config.server.port,
		path: '/',
		method: 'GET'
	};

	// make HTTP requests until server responds
	var req = http.request(opts, function () {
		done();
	});

	req.on('error', () => checkIfUp(done));
	req.end();
}

function watch(done) {
	g.sequence('default', 'nodemon', function () {
		bundler = watchify(bundler);
		// bundler.on('update', scripts);

		sync.init({
			proxy: `${config.server.host}:${config.server.port}`
		});

		gulp.watch(config.watch.styles, ['styles']);
		gulp.watch(config.watch.scripts, ['scripts']);
	});
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('nodemon', nodemon);
gulp.task('default', build);
gulp.task('watch', watch);
