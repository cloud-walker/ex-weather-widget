import {css, cx} from '#/panda/css'
import type {HTMLStyledProps} from '#/panda/types'

export function ButtonFlip({
	// css: cssProp,
	...props
}: HTMLStyledProps<'button'>) {
	return (
		<button
			type="button"
			{...props}
			className={cx(
				props.className,
				css(
					{
						borderRadius: 'md',
						textStyle: '3xl',
						color: 'white',
						backgroundColor: 'gray.700',
						padding: '1',
						_hover: {
							backgroundColor: 'gray.800',
						},
					},
					// cssProp,
				),
			)}
		/>
	)
}
