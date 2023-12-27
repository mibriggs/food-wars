<script lang="ts">
	import { Minus, Plus } from 'lucide-svelte';

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

<div class="flex w-40 items-center justify-between rounded-full bg-stone-200 p-2 text-2xl">
	<button
		class="flex h-9 w-9 touch-manipulation items-center justify-center rounded-full hover:bg-teal-600 hover:text-snow"
		on:click={decrement}
	>
		<Minus />
	</button>
	<div class="text-raisin">{value}</div>
	<button
		class="flex h-9 w-9 touch-manipulation items-center justify-center rounded-full hover:bg-teal-600 hover:text-snow"
		on:click={increment}
	>
		<Plus />
	</button>
</div>
