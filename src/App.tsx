import {useQuery} from '@tanstack/react-query'
import {clsx} from 'clsx'
import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import {MdFlipToBack, MdFlipToFront} from 'react-icons/md'
import {WiCloudy, WiHumidity, WiWindy} from 'react-icons/wi'

import {envVars} from './envVars'
import {getWeather} from './models/weather/weather'

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  day: 'numeric',
})

const sideStyle =
  'row-[1/-1] col-[1/-1] rounded-lg overflow-hidden [backface-visibility:hidden]'

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
    navigator.geolocation.getCurrentPosition(pos => {
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
          className={clsx(sideStyle, 'z-10')}
        />
        <Map
          position={position}
          onFlip={handleFlip}
          className={clsx(sideStyle, '[transform:rotateY(180deg)]')}
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
      className={clsx(className, 'flex flex-col gap-4', 'bg-white')}
    >
      <div className="self-end px-4 py-4">
        <ButtonFlip onClick={onFlip}>
          <MdFlipToBack />
        </ButtonFlip>
      </div>
      <div
        className={clsx(
          'flex-grow',
          'flex items-center justify-center',
          'text-7xl text-gray-500',
        )}
      >
        <div>{query.isSuccess ? query.data?.weather[0].id : 'Loading...'}</div>
      </div>
      <div className="pl-4">
        {query.isSuccess ? (
          <div className="flex items-center gap-4">
            <div className="text-gray-600 text-4xl font-light">
              {query.data?.main.temp}
            </div>
            <div className="flex-grow font-semibold text-xl">
              <div className="text-gray-500">
                {query.data?.weather[0].description}
              </div>
              <div className="text-gray-600">{`${query.data?.name}, ${query.data?.sys.country}`}</div>
            </div>
            <div className="bg-blue-400 text-white font-bold py-4 px-3">
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
            <InfoFooterItem icon={<WiWindy />}>
              {query.data?.wind.speed}
            </InfoFooterItem>
            <InfoFooterItem icon={<WiHumidity />}>
              {query.data?.main.humidity}
            </InfoFooterItem>
            <InfoFooterItem icon={<WiCloudy />}>
              {query.data?.clouds.all}
            </InfoFooterItem>
          </div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </section>
  )
}

function InfoFooterItem({
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
      <ButtonFlip onClick={onFlip} className="relative">
        <MdFlipToFront />
      </ButtonFlip>
    </div>
  )
}

function ButtonFlip({className, ...props}: HTMLAttributes<HTMLButtonElement>) {
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
