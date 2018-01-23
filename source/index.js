import {render} from 'react-dom'
import React from 'react'

import Root from '-/components/Root'

const doRender = () => render(<Root />, document.getElementById('root'))

doRender()

if (module.hot) {
  module.hot.accept('-/components/Root', () => doRender())
}
