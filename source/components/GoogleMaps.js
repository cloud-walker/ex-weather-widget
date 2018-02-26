import React from 'react'
import querystring from 'querystring'
import * as R from 'ramda'
import styled from 'styled-components'

const BASE_URL = 'https://maps.googleapis.com/maps/api/js'
const API_KEY = 'AIzaSyA3-604falj3yFcSqyU8b0n7oM8PEBuhGY'

const mapsPromise = new Promise(resolve => {
  const script = document.createElement('script')
  script.async = 1
  script.defer = 1
  script.src = `${BASE_URL}?${querystring.stringify({key: API_KEY})}`
  script.onload = () => resolve(window.google.maps)

  document.head.appendChild(script)
})

const GoogleMapsTarget = styled.div`
  height: ${p => p.height};
  width: 100%;

  & .gmnoprint,
  & .gm-fullscreen-control {
    display: none;
  }

  /**
   * NOTE: This rule try to remove the Google logo from the map
   * but its not so accurate as the other stuff..
   */
  & .gm-style iframe + div {
    display: none;
  }
`

export class GoogleMaps extends React.Component {
  static defaultProps = {
    zoom: 0,
    latitude: 0,
    longitude: 0,
    height: '300px',
    markers: [],
  }
  target = null
  componentDidMount = () =>
    mapsPromise.then(maps => {
      const center = {lat: this.props.latitude, lng: this.props.longitude}
      const map = new maps.Map(this.target, {
        zoom: this.props.zoom,
        center,
      })
      this.props.markers.forEach(
        ({position, icon}) => new maps.Marker({position, map, icon}),
      )
    })

  render = () => (
    <GoogleMapsTarget
      height={this.props.height}
      innerRef={ref => (this.target = ref)}
    />
  )
}
