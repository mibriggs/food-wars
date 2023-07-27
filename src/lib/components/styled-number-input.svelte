<script lang="ts">
	import DownArrow from './down-arrow.svelte';
	import UpArrow from './up-arrow.svelte';

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

<div
	class="flex h-16 w-1/3 cursor-pointer items-center justify-between rounded-lg bg-stone-200 p-4 md:w-3/12 lg:w-2/12 xl:w-1/12"
>
	<div class="font-sawarabi text-2xl font-bold text-raisin">{value}</div>
	<div class="flex flex-col content-center gap-3">
		<button on:click={increment}>
			<UpArrow size="8" />
		</button>
		<button on:click={decrement}>
			<DownArrow size="8" />
		</button>
	</div>
</div>
