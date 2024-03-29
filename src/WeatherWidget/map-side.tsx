import clsx from 'clsx'
import {HTMLAttributes} from 'react'
import {MdFlipToFront} from 'react-icons/md'

import {envVars} from '../envVars'
import {ButtonFlip} from './primitives'

/**
 * The map implementation docs: {@link https://developers.google.com/maps/documentation/embed/embedding-map| Google maps embed}
 */
export function MapSide({
  position,
  className,
  onFlip,
  ...props
}: HTMLAttributes<HTMLElement> & {
  position?: GeolocationPosition
  onFlip?: () => void
}) {
  const url = makeMapsIframeUrl(position)

  return (
    <div
      className={clsx(
        className,
        'relative',
        'flex items-start justify-end',
        'p-4',
        'min-h-[400px]',
      )}
      {...props}
    >
      <iframe
        key={url}
        width="100%"
        height="100%"
        style={{border: 0}}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={url}
        className="absolute inset-0"
      />
      <ButtonFlip onClick={onFlip} className="relative">
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
