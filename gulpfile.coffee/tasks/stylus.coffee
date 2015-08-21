gulp     = require 'gulp'
stylus   = require 'gulp-stylus'
watch    = require 'gulp-watch'
plumber  = require 'gulp-plumber'
nib      = require 'nib'
lazypipe = require 'lazypipe'
sync     = require 'browser-sync'
config   = require '../config'

src    = "#{config.src}/index.styl"
stylus = lazypipe()
	.pipe stylus, use: [nib()]
	.pipe gulp.dest, config.dist
	.pipe sync.reload, stream: true

gulp.task 'stylus', ->
	gulp.src src
		.pipe plumber()
		.pipe stylus()

gulp.task 'stylus:watch', ->
	gulp.src src
		.pipe plumber()
		.pipe watch(src)
		.pipe stylus()
