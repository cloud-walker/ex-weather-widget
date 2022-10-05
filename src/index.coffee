$             = require 'jquery'
WeatherWidget = require './library/weather'
context       = $ 'body'

$ ->
	new WeatherWidget(context)
