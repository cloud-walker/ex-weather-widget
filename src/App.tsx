import {styled} from '#/panda/jsx'

import {WeatherWidget} from './WeatherWidget/WeatherWidget'

export function App() {
	return (
		<styled.div
			css={{
				height: 'svh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'gray.500',
			}}
		>
			<WeatherWidget />
		</styled.div>
	)
}
