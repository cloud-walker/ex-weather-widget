import {defineConfig} from '@pandacss/dev'

export default defineConfig({
	// Whether to use css reset
	preflight: true,
	validation: 'error',
	strictPropertyValues: true,
	strictTokens: true,
	jsxFramework: 'react',
	jsxStyleProps: 'minimal',
	shorthands: false,
	importMap: '#',

	// Where to look for your css declarations
	include: ['./src/**/*.{ts,tsx}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {},
	},

	// The output directory for your css system
	outdir: 'styled-system',
})
