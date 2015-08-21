gulp = require 'gulp'
sync = require 'browser-sync'

gulp.task 'sync', ->
	sync
		open  : false
		server: './dist'

	gulp.watch 'dist/index.html'
		.on 'change', sync.reload
