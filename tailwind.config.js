/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				snow: '#FCF7F8',
				alabaster: '#E7EBE4'
			},
			fontFamily: {
				abhaya: ['"Abhaya Libre"', 'sans-serif']
			},
			boxShadow: {
				'3xl': '0px 4px 4px rgba(0, 0, 0, 0.25)'
			},
			borderRadius: {
				'4xl': '25px;'
			}
		}
	},
	plugins: []
};
