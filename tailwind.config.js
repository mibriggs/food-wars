/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const rotateY = plugin(function ({ addUtilities }) {
	addUtilities({
		'.rotateY-180': {
			transform: 'rotateY(180deg)'
		},
		'.rotateY-0': {
			transform: 'rotateY(0)'
		}
	});
});

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				snow: '#FCF7F8',
				alabaster: '#E7EBE4',
				jet: '#39393A',
				raisin: '#332E3C'
			},
			fontFamily: {
				abhaya: ['"Abhaya Libre"', 'sans-serif'],
				lora: ['Lora', 'sans-serif'],
				sawarabi: ['"Sawarabi Mincho"', 'sans-serif']
			},
			boxShadow: {
				'3xl': '0px 4px 4px rgba(0, 0, 0, 0.25)'
			},
			borderRadius: {
				'4xl': '25px;'
			},
			dropShadow: {
				'overlay-alabaster': '0px 4px 4px #E7EBE4'
			},
			screens: {
				'semi-md': '900px'
			}
		}
	},
	plugins: [rotateY]
};
