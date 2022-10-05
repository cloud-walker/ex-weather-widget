import coffeescript from 'rollup-plugin-coffee-script'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [coffeescript()],
})
