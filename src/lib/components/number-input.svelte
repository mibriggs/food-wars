<script lang="ts">
	import AddIcon from '../assets/add.svg';
	import MinusIcon from '../assets/minus.svg';

	export let min: number;
	export let max: number;
	export let value: number;

	const increment = () => {
		if (value < max) value += 1;
	};

	const decrement = () => {
		if (value > min) value -= 1;
	};
</script>

<div class="flex w-52 items-center text-2xl justify-between rounded-lg p-3 bg-stone-200 border-teal-600">
	<button class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-teal-600" on:click={decrement}>
		<img src={MinusIcon} alt="minus button" class="hovered"/>
	</button>
	<div class="text-raisin">{value}</div>
	<button class="w-9 h-9 rounded-full flex items-center justify-center hover:bg-teal-600" on:click={increment}>
		<img src={AddIcon} alt="plus button" class="hovered"/>
	</button>
</div>

<style lang="postcss">
	.hovered:hover {
		filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(332deg) brightness(105%) contrast(101%);
	}
</style>