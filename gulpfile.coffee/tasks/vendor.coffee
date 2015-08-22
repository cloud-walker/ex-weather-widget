gulp   = require 'gulp'
concat = require 'gulp-concat'
config = require '../config'

gulp.task 'vendor', ['vendor:css']

gulp.task 'vendor:css', ->
	gulp.src 'node_modules/normalize.css/normalize.css'
		.pipe concat('vendor.css')
		.pipe gulp.dest(config.dist)
