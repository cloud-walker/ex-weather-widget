import clsx from 'clsx'
import type {HTMLAttributes} from 'react'

export function ButtonFlip({
	className,
	...props
}: HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={clsx(
				className,
				'text-3xl p-1 bg-gray-700 hover:bg-gray-800 text-white rounded-md',
			)}
			{...props}
		/>
	)
}
