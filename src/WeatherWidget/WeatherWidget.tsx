import {clsx} from 'clsx'
import {useEffect, useState} from 'react'

import {MapSide} from './map-side'
import {WeatherSide} from './weather-side'

type WidgetSide = 'front' | 'back'

const commonSideStyle =
	'row-[1/-1] col-[1/-1] rounded-lg overflow-hidden [backface-visibility:hidden]'

export function WeatherWidget() {
	const [position, setPosition] = useState<GeolocationPosition>()
	const [side, setSide] = useState<WidgetSide>('front')
	const handleFlip = () => {
		setSide(side === 'front' ? 'back' : 'front')
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			setPosition(pos)
		})
	}, [])

	return (
		<div
			className={clsx(
				'grid auto-rows-fr',
				'w-[400px]',
				'transition duration-300',
				'shadow-lg',
				'data-[side=back]:[transform:rotateY(180deg)]',
				'[transform-style:preserve-3d] [perspective:1000px]',
			)}
			data-side={side}
		>
			<WeatherSide
				position={position}
				onFlip={handleFlip}
				className={clsx(commonSideStyle, 'z-10')}
			/>
			<MapSide
				position={position}
				onFlip={handleFlip}
				className={clsx(commonSideStyle, '[transform:rotateY(180deg)]')}
			/>
		</div>
	)
}
