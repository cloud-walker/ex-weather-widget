import React from 'react'
import querystring from 'querystring'
import * as R from 'ramda'
import styled from 'styled-components'

const GOOGLE_MAPS_KEY = 'AIzaSyCBuqtF7l-IOjE8IiSukbLn0IVTCOkxCB4'
const GOOGLE_MAPS_BASE_URL = 'https://www.google.com/maps/embed/v1/view'

const GoogleMapsIframeWrapper = styled.div`
  border: 4px solid;
`

export class GoogleMaps extends React.Component {
  static defaultProps = {
    zoom: 0,
    latitude: 0,
    longitude: 0,
  }

  get url() {
    return `${GOOGLE_MAPS_BASE_URL}?${querystring.stringify({
      key: GOOGLE_MAPS_KEY,
      zoom: this.props.zoom,
      center: R.pipe(R.pick(['latitude', 'longitude']), R.values, R.join(','))(
        this.props,
      ),
    })}`
  }

  render = () => (
    <GoogleMapsIframeWrapper>
      <iframe
        src={this.url}
        width="300"
        height="300"
        frameBorder="0"
        style={{border: 0}}
        allowFullScreen
        title="map"
      />
    </GoogleMapsIframeWrapper>
  )
}
