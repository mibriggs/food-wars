<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import type { Option } from '$lib/types/types';
	import { createEventDispatcher } from 'svelte';
	import DownArrowIcon from '../assets/arrow_drop_down.svg';
	import UpArrowIcon from '../assets/arrow_drop_up.svg';

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
</script>

<div
	class="flex w-full flex-col gap-2 rounded-lg text-left font-bold tracking-wider md:w-1/2 xl:w-1/4"
>
	<button
		class={`text-bold rounded-lg ${
			isOptionSelected && !isDropDownOpen ? 'border-4 border-teal-600 bg-alabaster' : 'bg-stone-200'
		} border-4 border-transparent p-4 text-left text-lg duration-500 active:border-teal-600 active:text-teal-600 lg:text-xl`}
		on:click={() => (isDropDownOpen = !isDropDownOpen)}
	>
		<div class="flex justify-between">
			<div>{dropdownText}</div>
			<img src={isDropDownOpen ? UpArrowIcon : DownArrowIcon} alt="Arrow Icon" />
		</div>
	</button>
	{#if isDropDownOpen}
		<div class="flex flex-col gap-2 rounded-lg bg-stone-200 p-4" in:slide out:slide>
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

<!-- <select name={id} {id}>
	{#each options as option}
		<option value={option.value}>
			<div class="flex items-center justify-center gap-2">
				<img src={option.imageSource} alt={option.value} />
				<div>{option.message}</div>
			</div>
		</option>
	{/each}
</select> -->
