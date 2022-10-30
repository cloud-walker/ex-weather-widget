import {useQuery} from '@tanstack/react-query'
import {HTMLAttributes, useEffect, useState} from 'react'

import classes from './App.module.css'
import {envVars} from './envVars'
import {getWeather} from './models/weather/weather'

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
    <div className={classes.layout}>
      <div
        className={classes.widget}
        style={{
          transform: side == 'front' ? undefined : 'rotateY(180deg)',
        }}
      >
        <Front position={position} onFlip={handleFlip} />
        <Back position={position} onFlip={handleFlip} />
      </div>
    </div>
  )
}

function Front({
  position,
  style,
  onFlip,
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
    <section {...props} style={{...style, backgroundColor: 'white'}}>
      <button onClick={onFlip}>flip</button>
      <div>{query.isSuccess ? query.data?.weather[0].id : 'Loading...'}</div>
      <div>
        {query.isSuccess ? (
          <>
            <div>{query.data?.main.temp}</div>
            <div>{query.data?.weather[0].description}</div>
            <div>{`${query.data?.name}, ${query.data?.sys.country}`}</div>
          </>
        ) : (
          'Loading...'
        )}
      </div>
      <div style={{display: 'flex', gap: '0.5em'}}>
        {query.isSuccess ? (
          <>
            <div>{query.data?.wind.speed}</div>
            <div>{query.data?.main.humidity}</div>
            <div>{query.data?.clouds.all}</div>
          </>
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
function Back({
  position,
  style,
  onFlip,
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
    <div {...props} style={{...style, backgroundColor: 'white'}}>
      <button
        onClick={onFlip}
        style={{position: 'absolute', top: '0.5em', right: '0.5em'}}
      >
        flip
      </button>

      <iframe
        width="100%"
        height="100%"
        style={{border: 0}}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={url.toString()}
      />
    </div>
  )
}
