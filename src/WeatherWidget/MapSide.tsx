import {MdFlipToFront} from 'react-icons/md'
import {envVars} from '#/envVars'
import {css, cx} from '#/panda/css'
import {type HTMLStyledProps, styled} from '#/panda/jsx'
import {ButtonFlip} from './ButtonFlip'

/**
 * The map implementation docs: {@link https://developers.google.com/maps/documentation/embed/embedding-map| Google maps embed}
 */
export function MapSide({
	position,
	onFlip,
	css: cssProp,
	...props
}: HTMLStyledProps<'div'> & {
	position?: GeolocationPosition
	onFlip?: () => void
}) {
	const url = makeMapsIframeUrl(position)

	return (
		<div
			{...props}
			className={cx(
				props.className,
				css(
					{
						position: 'relative',
						display: 'flex',
						alignItems: 'start',
						justifyContent: 'end',
						padding: '4',
						minHeight: '[400px]',
					},
					cssProp,
				),
			)}
		>
			<styled.iframe
				key={url}
				width="100%"
				title="Google Maps"
				height="100%"
				loading="lazy"
				allowFullScreen
				referrerPolicy="no-referrer-when-downgrade"
				src={url}
				css={{
					position: 'absolute',
					inset: '0',
				}}
				style={{border: 0}}
			/>
			<ButtonFlip
				onClick={onFlip}
				css={{
					position: 'relative',
				}}
			>
				<MdFlipToFront />
			</ButtonFlip>
		</div>
	)
}

function makeMapsIframeUrl(position?: GeolocationPosition): string {
	const url = new URL('https://www.google.com/maps/embed/v1/view')
	url.searchParams.set('key', envVars.VITE_GMAPS_APIKEY)
	url.searchParams.set('zoom', '10')
	url.searchParams.set(
		'center',
		`${position?.coords.latitude ?? 0},${position?.coords.longitude ?? 0}`,
	)
	url.searchParams.sort()
	return url.toString()
}
