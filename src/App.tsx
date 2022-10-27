import {useQuery} from '@tanstack/react-query'
import {useEffect, useState} from 'react'

import classes from './App.module.css'
import {envVars} from './envVars'
import {getWeather} from './models/weather/weather'

export function App() {
  const [side, setSide] = useState<'front' | 'back'>('front')
  const [position, setPosition] = useState<GeolocationPosition>()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition(pos)
    })
  }, [])
  return (
    <div
      className={classes.widget}
      onClick={() => {
        setSide(side == 'front' ? 'back' : 'front')
      }}
    >
      {side == 'front' ? (
        <Front position={position} />
      ) : (
        <Back position={position} />
      )}
    </div>
  )
}

function Front({position}: {position?: GeolocationPosition}) {
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
    <section style={{backgroundColor: 'white'}}>
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
function Back({position}: {position?: GeolocationPosition}) {
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
    <div style={{backgroundColor: 'white'}}>
      <iframe
        width="600"
        height="450"
        style={{border: 0}}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={url.toString()}
      />
    </div>
  )
}
