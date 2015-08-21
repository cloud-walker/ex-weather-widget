gulp   = require 'gulp'
watch  = require 'gulp-watch'
config = require '../config'

gulp.task 'watch', [
	'move:watch'
	'stylus:watch'
]
