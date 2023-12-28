<script lang="ts">
	import { cuisinesStore } from '$stores/stores';
	import { Check, Plus } from 'lucide-svelte';

	const cuisines = ['american', 'italian', 'japanese', 'nigerian', 'indian', 'chinese'];
	const isSelected: boolean[] = new Array<boolean>(cuisines.length).fill(false);

	const handleClick = (currIndex: number) => {
		isSelected[currIndex] = !isSelected[currIndex];
		isSelected[currIndex]
			? cuisinesStore.addItem(cuisines[currIndex])
			: cuisinesStore.deleteItem(cuisines[currIndex]);
	};
</script>

<div class="flex w-full flex-wrap gap-2 lg:w-1/2">
	{#each cuisines as cuisine, index}
		<button
			class="rounded-full border-2 p-1 px-3 text-center focus:shadow-none focus:outline-none"
			class:clicked={isSelected[index]}
			on:click={() => handleClick(index)}
		>
			<div class="flex items-center justify-center gap-2">
				<span class="capitalize">{cuisine}</span>
				{#if isSelected[index]}
					<Check size="20" />
				{:else}
					<Plus size="20" />
				{/if}
			</div>
		</button>
	{/each}
</div>

<style lang="postcss">
	.clicked {
		background-color: theme(colors.alabaster);
		border-color: theme(colors.teal.600);
		color: theme(colors.teal.600);
	}
</style>
