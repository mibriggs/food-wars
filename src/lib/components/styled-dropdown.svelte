<script lang="ts">
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

<div class="flex w-1/4 flex-col gap-2 rounded-xl text-left">
	<button
		class={`text-bold rounded-xl ${
			isOptionSelected ? 'bg-alabaster' : 'bg-stone-200'
		} p-4 text-left text-xl focus:border-4 focus:border-solid focus:border-raisin`}
		on:click={() => (isDropDownOpen = !isDropDownOpen)}
		on:change={() => console.log('state changed')}
	>
		<div class="flex justify-between">
			<div>{dropdownText}</div>
			<img src={isDropDownOpen ? UpArrowIcon : DownArrowIcon} alt="Arrow Icon" />
		</div>
	</button>
	{#if isDropDownOpen}
		<div class="flex flex-col gap-2 rounded-xl bg-stone-200 p-4">
			{#each options as option}
				<button
					class="flex items-center justify-start gap-3 rounded-xl p-2 hover:border-l-4 hover:border-solid hover:border-teal-600 hover:bg-alabaster"
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
