import React from 'react'
import styled, {injectGlobal} from 'styled-components'
import {Toggle} from 'react-powerplug'

import customMarker from './flat-marker.png'
import {GoogleMaps} from '~/components/GoogleMaps'

injectGlobal`
  * {
    &,
    &:before,
    &:after {
      box-sizing: border-box;
    }
  }

  body {
    margin: 0;
    background-color: rgb(78, 88, 95);
  }

  iframe {
    display: block;
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
`

const FrontContent = styled.div`
  background: rgb(241, 248, 249);
`

const FrontFooter = styled.footer`
  background: rgb(45, 50, 52);
`

export class Root extends React.Component {
  mapCenter = {lat: 0, lng: 0}
  render() {
    return (
      <GoogleMaps
        zoom={5}
        center={this.mapCenter}
        markers={[{position: this.mapCenter, icon: customMarker}]}
      />
    )
  }
}
