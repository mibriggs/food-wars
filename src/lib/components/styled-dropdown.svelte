<script lang="ts">
	import type { Meal } from '$types/types';
	import { ChevronDown, ChevronUp, EggFried, Sandwich, Beef, Popcorn } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let options: Meal[];

	let isDropDownOpen: boolean = false;
	let isOptionSelected: boolean = false;
	let dropdownText: string = 'Please select one';
	const dispatch = createEventDispatcher();

	const handleDropDownOptionClick = (dropdownValue: string) => {
		dropdownText = dropdownValue;
		isDropDownOpen = !isDropDownOpen;
		isOptionSelected = true;
		dispatch('selectionMade', { value: dropdownValue });
	};

	const getIcon = (mealType: Meal) => {
		switch (mealType) {
			case 'breakfast':
				return EggFried;
			case 'lunch':
				return Sandwich;
			case 'dinner':
				return Beef;
			case 'snack':
				return Popcorn;
		}
	};

	$: dropdownClosedAndChoiceMade = isOptionSelected && !isDropDownOpen;
</script>

<div
	class="flex w-full flex-col gap-2 rounded-lg text-left tracking-wider md:w-1/2 lg:w-2/5 xl:w-1/4"
>
	<button
		class={`rounded-lg ${dropdownClosedAndChoiceMade ? ' bg-alabaster' : 'bg-stone-200'} border-2 ${
			dropdownClosedAndChoiceMade ? 'border-teal-600' : 'border-transparent'
		} text-md p-2 text-left duration-500 active:border-teal-600 active:text-teal-600`}
		on:click={() => (isDropDownOpen = !isDropDownOpen)}
	>
		<div class="flex items-center justify-between">
			<div class="capitalize">{dropdownText}</div>
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
					<svelte:component this={getIcon(option)} />
					<div class="capitalize">{option}</div>
				</button>
			{/each}
		</div>
	{/if}
</div>
