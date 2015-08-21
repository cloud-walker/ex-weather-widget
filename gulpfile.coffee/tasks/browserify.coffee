gulp       = require 'gulp'
browserify = require 'browserify'
watchify   = require 'watchify'
source     = require 'vinyl-source-stream'
rename     = require 'gulp-rename'
sync       = require 'browser-sync'
gutil      = require 'gulp-util'
config     = require '../config'

entryName = 'index.coffee'
src       = "#{config.src}/#{entryName}"

getBundler = (opts = {}) ->
	params =
		entries   : src
		extensions: ['.coffee']

	if opts.watch is true
		b = watchify browserify(params)
	else
		b = browserify params

	b.transform 'coffeeify'
	b.on 'update', bundle if opts.watch is true
	b.on 'log', gutil.log

	b
		.bundle()
		.on 'error', (err) ->
			gutil.log gutil.colors.red('[BROWSERIFY]', err)
			done() unless opts.watch is true

bundle = ->
	getBundler watch: true
		.pipe compile()

compile = require('lazypipe')()
	.pipe source, entryName
	.pipe rename, extname: '.js'
	.pipe gulp.dest, config.dist
	.pipe sync.reload, stream: true

gulp.task 'browserify', (done) ->
	getBundler()
		.pipe compile()

gulp.task 'watchify', bundle
