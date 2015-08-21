gulp   = require 'gulp'
stylus = require 'gulp-stylus'
nib    = require 'nib'
config = require '../config'

gulp.task 'stylus', ->
	gulp.src "#{config.src}/index.styl"
		.pipe stylus(use: [nib()])
		.pipe gulp.dest(config.dist)
