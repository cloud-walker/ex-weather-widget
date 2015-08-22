gulp   = require 'gulp'
sync   = require 'browser-sync'
config = require '../config'

gulp.task 'sync', ->
	sync
		open  : false
		server: [config.dist, 'node_modules']
