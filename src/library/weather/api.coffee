$ = require 'jquery'

class WeatherApi
	address: 'http://api.openweathermap.org/data/2.5/weather'
	get: (opts = {}) ->
		data =
			lat: opts.latitude or 0
			lon: opts.longitude or 0

		$.getJSON @address, data, (res) ->
			$(window).trigger 'openweathermap-data-found', res

module.exports = WeatherApi
