<script lang="ts">
	import AddIcon from '$images/add.svg';
	import MinusIcon from '$images/minus.svg';

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

<div class="flex w-48 items-center justify-between rounded-full bg-stone-200 p-2 text-2xl">
	<button
		class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-teal-600"
		on:click={decrement}
	>
		<img src={MinusIcon} alt="minus button" class="hovered" />
	</button>
	<div class="text-raisin">{value}</div>
	<button
		class="flex h-9 w-9 items-center justify-center rounded-full hover:bg-teal-600"
		on:click={increment}
	>
		<img src={AddIcon} alt="plus button" class="hovered" />
	</button>
</div>

<style lang="postcss">
	.hovered:hover {
		filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(332deg) brightness(105%) contrast(101%);
	}
</style>
