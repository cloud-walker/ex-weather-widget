import {envVars} from '#/envVars'

export interface ResponseGetWeather {
	base: string
	clouds: {all: number}
	rain?: Record<string, number>
	cod: number
	dt: number
	id: number
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		humidity: number
	}
	name: string
	timezone: number
	visibility: number
	wind: {deg: number; gust: number; speed: number}
	weather: Array<{description: string; icon: string; id: number; main: string}>
	sys: {
		country: string
		id: number
		sunrise: number
		sunset: number
		type: number
	}
	coord: {lon: number; lat: number}
}

export async function getWeather(params: {
	latitude: number
	longitude: number
}) {
	const url = new URL('https://api.openweathermap.org/data/2.5/weather')
	url.searchParams.set('lat', params.latitude.toString())
	url.searchParams.set('lon', params.longitude.toString())
	url.searchParams.set('units', 'metric')
	url.searchParams.set('appid', envVars.VITE_OPENWEATHER_APIKEY)
	const res = await fetch(url.toString())
	if (!res.ok) {
		throw res
	}
	const body: ResponseGetWeather = await res.json()
	return body
}
