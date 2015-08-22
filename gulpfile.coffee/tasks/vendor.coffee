gulp    = require 'gulp'
concat  = require 'gulp-concat'
rewrite = require 'gulp-rewrite-css'
config  = require '../config'

gulp.task 'vendor', ['vendor:css']

gulp.task 'vendor:css', ->
	gulp.src [
		'node_modules/normalize.css/normalize.css'
		'node_modules/open-sans-fontface/open-sans.css'
		'node_modules/source-sans-pro/source-sans-pro.css'
		'node_modules/weather-icons/css/weather-icons.css'
	]
		.pipe rewrite(destination: 'node_modules')
		.pipe concat('vendor.css')
		.pipe gulp.dest(config.dist)
