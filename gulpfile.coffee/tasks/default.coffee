gulp     = require 'gulp'
sequence = require 'gulp-sequence'

gulp.task 'default', sequence('build', 'sync', 'watch')
