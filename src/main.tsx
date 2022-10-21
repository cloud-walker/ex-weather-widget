import './style.css'

import {getBySelector} from '@cloudwalker/dom-utils'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createRoot} from 'react-dom/client'
import {App} from './App'

createRoot(getBySelector('#root')).render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>,
)
