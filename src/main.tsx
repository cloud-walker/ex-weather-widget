import './style.css'

import {getBySelector} from '@cloudwalker/dom-utils'
import {createRoot} from 'react-dom/client'

createRoot(getBySelector('#root')).render(<div>Weather Widget</div>)
