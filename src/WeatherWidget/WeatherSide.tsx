import {useQuery} from '@tanstack/react-query'
import {createElement} from 'react'
import {MdFlipToBack} from 'react-icons/md'
import {WiCloudy, WiHumidity, WiWindy} from 'react-icons/wi'
import {css, cx} from '#/panda/css'
import {styled} from '#/panda/jsx'
import {getWeather} from '../models/weather/weather'
import {weatherId2Icon} from '../models/weather/weatherId2Icon'
import {ButtonFlip} from './ButtonFlip'

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
}: React.ComponentPropsWithRef<'div'> & {
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
			className={cx(
				className,
				css({
					backgroundColor: 'white',
					display: 'flex',
					flexDirection: 'column',
					gap: '4',
				}),
			)}
			{...props}
		>
			<styled.div
				css={{
					alignSelf: 'end',
					padding: '4',
				}}
			>
				<ButtonFlip onClick={onFlip}>
					<MdFlipToBack />
				</ButtonFlip>
			</styled.div>
			<div
				className={css({
					flexGrow: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				})}
			>
				<div
					className={css({
						textStyle: '7xl',
						color: 'gray.600',
					})}
				>
					{weather != null
						? createElement(weatherId2Icon[weather.id], {
								style: {fontSize: '2em'},
							})
						: 'Loading...'}
				</div>
			</div>
			<div
				className={css({
					paddingInlineStart: '4',
				})}
			>
				{query.isSuccess ? (
					<div
						className={css({
							display: 'flex',
							alignItems: 'center',
							gap: '4',
						})}
					>
						<div
							className={css({
								color: 'gray.600',
								textStyle: '3xl',
								fontWeight: 'semibold',
							})}
						>
							{data && celsiusFormatter.format(Math.ceil(data.main.temp))}
						</div>
						<div
							className={css({
								flexGrow: 1,
								fontWeight: 'medium',
								textStyle: 'xl',
							})}
						>
							<div
								className={css({
									color: 'gray.500',
									textTransform: 'capitalize',
								})}
							>
								{weather?.description}
							</div>
							<div
								className={css({
									color: 'gray.600',
								})}
							>{`${data?.name}, ${data?.sys.country}`}</div>
						</div>
						<div
							className={css({
								backgroundColor: 'blue.400',
								color: 'white',
								textStyle: 'lg',
								fontWeight: 'medium',
								paddingBlock: '4',
								paddingInline: '3',
							})}
						>
							{dateFormatter.format(new Date())}
						</div>
					</div>
				) : (
					<div
						className={css({
							textAlign: 'center',
						})}
					>
						Loading...
					</div>
				)}
			</div>
			<div
				className={css({
					backgroundColor: 'gray.800',
					color: 'white',
					fontWeight: 'semibold',
					paddingInline: '4',
					paddingBlock: '10',
				})}
			>
				{query.isSuccess ? (
					<div
						className={css({
							display: 'flex',
							gap: '2',
							justifyContent: 'space-evenly',
						})}
					>
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
					<div
						className={css({
							textAlign: 'center',
						})}
					>
						Loading...
					</div>
				)}
			</div>
		</div>
	)
}

function WeatherFooterItem({
	children,
	icon,
}: React.ComponentPropsWithRef<'div'> & {
	icon: React.ReactNode
}) {
	return (
		<div
			className={css({
				display: 'flex',
				alignItems: 'center',
				gap: '1',
			})}
		>
			<div
				className={css({
					color: 'gray.400',
					textStyle: '3xl',
				})}
			>
				{icon}
			</div>
			{children}
		</div>
	)
}
