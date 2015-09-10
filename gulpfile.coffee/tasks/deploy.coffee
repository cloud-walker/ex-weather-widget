gulp   = require 'gulp'
config = require '../config'

gulp.task 'deploy', ['build'], ->
	gulp.src "#{config.dist}/**"
		.pipe gulp.dest('.')
