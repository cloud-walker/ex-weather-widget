$     = require 'jquery'
gmaps = require 'google-maps'

class WeatherWidget
	constructor: (context) ->
		@target = context.find '.weather.widget'
		@initListeners()
		@fetchPosition()

	fetchPosition: ->
		navigator.geolocation.getCurrentPosition (pos) =>
			@target.trigger 'position-fetched', pos

	loadMap: (opts) ->
		gmaps.load (google) =>
			context = @target.find('.map')[0]
			latLng  = new google.maps.LatLng(opts.lat, opts.lng)

			map = new google.maps.Map(context,
				zoom             : 10
				center           : latLng
				mapTypeControl   : false
				streetViewControl: false
				zoomControl      : false
			)
			marker = new google.maps.Marker(
				position: latLng
				map     : map
				title   : 'Your position'
			)

			console.log marker

	initListeners: ->
		@target
			.on 'flip', ->
				$(@).toggleClass 'flipped'

			.on 'position-fetched', (e, pos) =>
				@loadMap
					lat: pos.coords.latitude
					lng: pos.coords.longitude

			.on 'click', '.icon', ->
				$(@).trigger 'flip'

module.exports = WeatherWidget
