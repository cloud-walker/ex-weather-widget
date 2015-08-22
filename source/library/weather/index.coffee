$          = require 'jquery'
gmaps      = require 'google-maps'
WeatherApi = require './api'
tuc        = require 'temp-units-conv'
moment     = require 'moment'

class WeatherWidget
	constructor: (context) ->
		@target = context.find '.weather.widget'
		@api    = new WeatherApi()
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

	initFrontFace: (res) ->
		target = @target.find '.front.face'
		console.log 'initFrontFace', res
		target
			.find '.temperature'
			.text "#{Math.round(tuc.k2c(res.main.temp))}°"

		target
			.find '.mood'
			.text res.weather[0].description

		target
			.find '.location'
			.text "#{res.name}, #{res.sys.country}"

		target
			.find '.month'
			.text moment().format('MMM')

		target
			.find '.day'
			.text moment().format('DD')

		footer = target.find 'footer'

		footer
			.find '.wind .value'
			.text "#{res.wind.speed}m/s"

		footer
			.find '.humidity .value'
			.text "#{res.main.humidity}%"

		footer
			.find '.sun .value'
			.text "#{100 - res.clouds.all}%"

	initListeners: ->
		$(window).on 'openweathermap-data-found', (e, res) =>
			@initFrontFace res

		@target
			.on 'flip', (e, flip) ->
				if flip
					$(@).addClass 'flipped'
				else
					$(@).removeClass 'flipped'

			.on 'position-fetched', (e, pos) =>
				@loadMap
					lat: pos.coords.latitude
					lng: pos.coords.longitude

				@api.get
					latitude : pos.coords.latitude
					longitude: pos.coords.longitude

			.on 'click', '.front .icon', ->
				$(@).trigger 'flip', true

			.on 'click', '.back .icon', ->
				$(@).trigger 'flip', false

module.exports = WeatherWidget
