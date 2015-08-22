gulp     = require 'gulp'
stylus   = require 'gulp-stylus'
watch    = require 'gulp-watch'
plumber  = require 'gulp-plumber'
nib      = require 'nib'
lazypipe = require 'lazypipe'
sync     = require 'browser-sync'
config   = require '../config'

gulp.task 'stylus', ->
	gulp.src "#{config.src}/index.styl"
		.pipe plumber()
		.pipe stylus(use: [nib()])
		.pipe gulp.dest(config.dist)
		.pipe sync.reload(stream: true)

gulp.task 'stylus:watch', ->
	watch "#{config.src}/**/*.styl", ->
		gulp.start 'stylus'
