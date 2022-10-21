import './style.css'

import {getBySelector} from '@cloudwalker/dom-utils'
import {createRoot} from 'react-dom/client'
import {App} from './App'

createRoot(getBySelector('#root')).render(<App />)
