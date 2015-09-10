gulp     = require 'gulp'
watch    = require 'gulp-watch'
lazypipe = require 'lazypipe'
sync     = require 'browser-sync'
config   = require '../config'

src  = [
	"#{config.src}/index.html"
	"#{config.src}/**/*.png"
	'node_modules/@(material-design-icons|weather-icons|source-sans-pro|open-sans-fontface)/**/*.@(woff|eot|ttf|woff2|otf)'
]
move = lazypipe()
	.pipe gulp.dest, config.dist
	.pipe sync.reload, stream: true

gulp.task 'move', ->
	gulp.src src
		.pipe move()

gulp.task 'move:watch', (done) ->
	gulp.src src
		.pipe watch(src)
		.pipe move()
