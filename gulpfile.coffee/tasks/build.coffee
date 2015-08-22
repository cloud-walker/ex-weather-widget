gulp     = require 'gulp'
sequence = require 'gulp-sequence'

gulp.task 'build', sequence('clean', [
	'move'
	'vendor'
	'stylus'
	'browserify'
])
