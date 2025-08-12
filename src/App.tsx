import {styled} from '#/jsx'

import {WeatherWidget} from './WeatherWidget/WeatherWidget'

export function App() {
	return (
		<styled.div
			css={{
				height: 'svh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<WeatherWidget />
		</styled.div>
	)
}
