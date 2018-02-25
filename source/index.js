import {render} from 'react-dom'
import React from 'react'

import {Root} from '~/features/Root'

const doRender = () => render(<Root />, document.getElementById('root'))

doRender()

if (module.hot) {
  module.hot.accept('~/features/Root', () => doRender())
}
