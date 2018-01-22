import React from 'react'
import {injectGlobal} from 'styled-components'

injectGlobal`
  body {
    margin: 0;
  }

  #root {
    display: grid;
    min-height: 100vh;
    background-color: rgb(78, 88, 95);

    > * {
      margin: auto;
    }
  }
`

class Root extends React.Component {
  render() {
    return <span>Root</span>
  }
}

export default Root
