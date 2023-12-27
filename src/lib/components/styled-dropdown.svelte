<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { Option } from '$types';

	export let options: Option[];

	let isDropDownOpen: boolean = false;
	let isOptionSelected: boolean = false;
	let dropdownText: string = 'Please select one';
	const dispatch = createEventDispatcher();

	const handleDropDownOptionClick = (dropdownValue: Option) => {
		dropdownText = dropdownValue.message;
		isDropDownOpen = !isDropDownOpen;
		isOptionSelected = true;
		dispatch('selectionMade', { value: dropdownValue.value });
	};

	$: dropdownClosedAndChoiceMade = isOptionSelected && !isDropDownOpen;
</script>

<div
	class="flex w-full flex-col gap-2 rounded-lg text-left font-bold tracking-wider md:w-1/2 lg:w-2/5 xl:w-1/4"
>
	<button
		class={`rounded-lg ${dropdownClosedAndChoiceMade ? ' bg-alabaster' : 'bg-stone-200'} border-2 ${
			dropdownClosedAndChoiceMade ? 'border-teal-600' : 'border-transparent'
		} text-md p-2 text-left duration-500 active:border-teal-600 active:text-teal-600`}
		on:click={() => (isDropDownOpen = !isDropDownOpen)}
	>
		<div class="flex items-center justify-between">
			<div>{dropdownText}</div>
			{#if isDropDownOpen}
				<ChevronUp />
			{:else}
				<ChevronDown />
			{/if}
		</div>
	</button>
	{#if isDropDownOpen}
		<div class="flex flex-col gap-2 rounded-lg bg-stone-200 p-2" in:slide out:slide>
			{#each options as option}
				<button
					class="flex items-center justify-start gap-3 rounded-r-lg border-l-4 p-2 hover:border-teal-600 hover:bg-alabaster"
					on:click={() => handleDropDownOptionClick(option)}
				>
					<img src={option.imageSource} alt={option.value} />
					<div>{option.message}</div>
				</button>
			{/each}
		</div>
	{/if}
</div>
