import {useEffect, useState} from 'react'
import {css} from '#/panda/css'
import {MapSide} from './MapSide'
import {WeatherSide} from './WeatherSide'

type WidgetSide = 'front' | 'back'

const commonSideStyle = css.raw({
	overflow: 'hidden',
	borderRadius: 'lg',
	backfaceVisibility: 'hidden',
	gridRow: '[1/-1]',
	gridColumn: '[1/-1]',
})

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
			className={css({
				display: 'grid',
				gridAutoRows: 'fr',
				width: '[400px]',
				boxShadow: 'lg',
				transition: 'all',
				transitionDuration: '[300ms]',
				transformStyle: 'preserve-3d',
				perspective: '[1000px]',
				'&[data-side="back"]': {
					transform: 'rotateY(180deg)',
				},
			})}
			data-side={side}
		>
			<WeatherSide
				position={position}
				onFlip={handleFlip}
				css={[
					commonSideStyle,
					{
						zIndex: '10',
					},
				]}
			/>
			<MapSide
				position={position}
				onFlip={handleFlip}
				css={[
					commonSideStyle,
					{
						transform: 'rotateY(180deg)',
					},
				]}
			/>
		</div>
	)
}
