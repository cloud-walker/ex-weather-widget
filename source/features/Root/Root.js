import React from 'react'
import styled, {injectGlobal} from 'styled-components'
import {Toggle} from 'react-powerplug'

import {Widget} from '~/components/Widget'

injectGlobal`
  body {
    margin: 0;
    background-color: rgb(78, 88, 95);
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
  render() {
    return 'Root'
  }
}
