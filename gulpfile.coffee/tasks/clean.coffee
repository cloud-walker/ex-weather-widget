gulp   = require 'gulp'
del    = require 'del'
config = require '../config'

gulp.task 'clean', (done) ->
	del [config.dist], done
