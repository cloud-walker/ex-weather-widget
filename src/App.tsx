import {useQuery} from '@tanstack/react-query'
import {clsx} from 'clsx'
import {HTMLAttributes, useEffect, useState} from 'react'
import {MdFlipToBack, MdFlipToFront} from 'react-icons/md'
import {WiCloudy, WiHumidity, WiWindy} from 'react-icons/wi'

import {envVars} from './envVars'
import {getWeather} from './models/weather/weather'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  day: 'numeric',
})

/**
 * Flip card technique taken from {@link https://www.w3schools.com/howto/howto_css_flip_card.asp w3schools}
 */
export function App() {
  const [side, setSide] = useState<'front' | 'back'>('front')
  const [position, setPosition] = useState<GeolocationPosition>()
  const handleFlip = () => {
    setSide(side == 'front' ? 'back' : 'front')
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition(pos)
    })
  }, [])
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={clsx(
          'grid auto-rows-fr',
          'w-[400px]',
          'transition-all',
          'data-[side=back]:[transform:rotateY(180deg)]',
          '[transform-style:preserve-3d] [perspective:1000px]',
        )}
        data-side={side}
      >
        <Info
          position={position}
          onFlip={handleFlip}
          className="row-[1/-1] col-[1/-1] rounded [backface-visibility:hidden] z-10"
        />
        <Map
          position={position}
          onFlip={handleFlip}
          className="row-[1/-1] col-[1/-1] rounded [backface-visibility:hidden] [transform:rotateY(180deg)]"
        />
      </div>
    </div>
  )
}

function Info({
  position,
  onFlip,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  position?: GeolocationPosition
  onFlip: () => void
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
  return (
    <section
      {...props}
      className={clsx(className, 'flex flex-col gap-2', 'p-4', 'bg-white')}
    >
      <button onClick={onFlip} className="self-end">
        <MdFlipToBack />
      </button>
      <div className={clsx('flex-grow', 'flex items-center justify-center')}>
        <div>{query.isSuccess ? query.data?.weather[0].id : 'Loading...'}</div>
      </div>
      <div>
        {query.isSuccess ? (
          <div className="flex items-center gap-2">
            <div>{query.data?.main.temp}</div>
            <div className="flex-grow">
              <div>{query.data?.weather[0].description}</div>
              <div>{`${query.data?.name}, ${query.data?.sys.country}`}</div>
            </div>
            <div>{dateFormatter.format(new Date())}</div>
          </div>
        ) : (
          'Loading...'
        )}
      </div>
      <div>
        {query.isSuccess ? (
          <div className="flex gap-2 justify-evenly">
            <div className="flex gap-1">
              <WiWindy />
              {query.data?.wind.speed}
            </div>
            <div className="flex gap-1">
              <WiHumidity />
              {query.data?.main.humidity}
            </div>
            <div className="flex gap-1">
              <WiCloudy />
              {query.data?.clouds.all}
            </div>
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
    </section>
  )
}

/**
 * @link https://developers.google.com/maps/documentation/embed/embedding-map
 */
function Map({
  position,
  onFlip,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  position?: GeolocationPosition
  onFlip: () => void
}) {
  const url = new URL('https://www.google.com/maps/embed/v1/view')
  url.searchParams.set('key', envVars.VITE_GMAPS_APIKEY)
  url.searchParams.set('zoom', '10')
  url.searchParams.set(
    'center',
    position
      ? `${position.coords.latitude},${position.coords.longitude}`
      : '0,0',
  )
  url.searchParams.sort()

  return (
    <div
      {...props}
      className={clsx(
        className,
        'relative',
        'flex items-start justify-end',
        'p-4',
        'min-h-[400px]',
      )}
    >
      <iframe
        width="100%"
        height="100%"
        style={{border: 0}}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={url.toString()}
        className="absolute inset-0"
      />
      <button onClick={onFlip} className="relative">
        <MdFlipToFront />
      </button>
    </div>
  )
}
