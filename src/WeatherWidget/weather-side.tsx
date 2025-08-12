import {useQuery} from '@tanstack/react-query'
import {clsx} from 'clsx'
import {
	createElement,
	type HTMLAttributes,
	type PropsWithChildren,
	type ReactNode,
} from 'react'
import {MdFlipToBack} from 'react-icons/md'
import {WiCloudy, WiHumidity, WiWindy} from 'react-icons/wi'

import {getWeather} from '../models/weather/weather'
import {weatherId2Icon} from '../models/weather/weatherId2Icon'
import {ButtonFlip} from './primitives'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
	month: 'short',
	day: 'numeric',
})
const celsiusFormatter = new Intl.NumberFormat('en-GB', {
	style: 'unit',
	unit: 'celsius',
})

export function WeatherSide({
	position,
	className,
	onFlip,
	...props
}: HTMLAttributes<HTMLElement> & {
	position?: GeolocationPosition
	onFlip?: () => void
}) {
	const params = position && {
		longitude: position.coords.longitude,
		latitude: position.coords.latitude,
	}
	const query = useQuery({
		queryKey: ['openweather', params],
		queryFn: () => {
			if (params == null) {
				return
			}
			return getWeather(params)
		},
		enabled: params != null,
	})
	const data = query.data
	const weather = data?.weather[0]

	return (
		<div
			className={clsx(className, 'flex flex-col gap-4', 'bg-white')}
			{...props}
		>
			<div className="self-end px-4 py-4">
				<ButtonFlip onClick={onFlip}>
					<MdFlipToBack />
				</ButtonFlip>
			</div>
			<div className={clsx('flex-grow', 'flex items-center justify-center')}>
				<div className="text-7xl text-gray-600">
					{weather != null
						? createElement(weatherId2Icon[weather.id], {
								style: {fontSize: '2em'},
							})
						: 'Loading...'}
				</div>
			</div>
			<div className="pl-4">
				{query.isSuccess ? (
					<div className="flex items-center gap-4">
						<div className="text-gray-600 text-3xl font-semibold">
							{data && celsiusFormatter.format(Math.ceil(data.main.temp))}
						</div>
						<div className="flex-grow font-medium text-xl">
							<div className="text-gray-500 capitalize">
								{weather?.description}
							</div>
							<div className="text-gray-600">{`${data?.name}, ${data?.sys.country}`}</div>
						</div>
						<div className="bg-blue-400 text-white text-lg font-medium py-4 px-3">
							{dateFormatter.format(new Date())}
						</div>
					</div>
				) : (
					<div className="text-center">Loading...</div>
				)}
			</div>
			<div className="bg-gray-800 text-white font-semibold px-4 py-10">
				{query.isSuccess ? (
					<div className="flex gap-2 justify-evenly">
						<WeatherFooterItem icon={<WiWindy />}>
							{data?.wind.speed}
						</WeatherFooterItem>
						<WeatherFooterItem icon={<WiHumidity />}>
							{data?.main.humidity}
						</WeatherFooterItem>
						<WeatherFooterItem icon={<WiCloudy />}>
							{data?.clouds.all}
						</WeatherFooterItem>
					</div>
				) : (
					<div className="text-center">Loading...</div>
				)}
			</div>
		</div>
	)
}

function WeatherFooterItem({
	children,
	icon,
}: PropsWithChildren<{icon: ReactNode}>) {
	return (
		<div className="flex items-center gap-1">
			<div className="text-gray-400 text-3xl">{icon}</div>
			{children}
		</div>
	)
}
