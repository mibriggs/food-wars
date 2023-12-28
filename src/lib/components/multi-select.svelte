<script lang="ts">
	import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import type { MultiSelectOption } from '$types';
	import Checkbox from './checkbox.svelte';
	import { diets, intolerances } from '../constants/constants';

	export let name: string = 'Restrictions';
	export let options: MultiSelectOption[] = diets.concat(intolerances).map((restriction) => {
		const option: MultiSelectOption = {
			value: restriction,
			isIntolerance: intolerances.indexOf(restriction) !== -1,
			checked: false
		};
		return option;
	});

	let filteredList: MultiSelectOption[] = options;
	let isDropDownOpen: boolean = false;
	let searchValue: string = '';

	const handleSearchChange = (): void => {
		filteredList = options.filter((listOption) =>
			listOption.value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
		);
	};
</script>

<div class="flex w-full flex-col gap-2 md:w-6/12 lg:w-[30%]">
	<button
		class="flex w-full items-center justify-between rounded-lg border-2 border-transparent bg-stone-200 p-2 hover:border-teal-600"
		on:click={() => (isDropDownOpen = !isDropDownOpen)}
	>
		<div class="flex items-center gap-2 pl-2">
			<AlertTriangle />
			<div>{name}</div>
		</div>
		{#if isDropDownOpen}
			<ChevronUp />
		{:else}
			<ChevronDown />
		{/if}
	</button>

	{#if isDropDownOpen}
		<div
			class="flex h-52 w-full flex-col overflow-y-auto rounded-lg bg-stone-200 pb-2 pl-2 pr-2 text-lg text-raisin"
			in:slide
			out:slide
		>
			<div class=" sticky top-0 w-full bg-stone-200 pt-2">
				<input
					type="text"
					class="search-bg w-full rounded-lg bg-stone-300 p-2 text-raisin outline-none"
					placeholder="Search options..."
					bind:value={searchValue}
					on:input={handleSearchChange}
				/>
			</div>
			{#each filteredList as option}
				<div
					class="mt-1 flex w-full items-center justify-start gap-1 self-start rounded-r-lg border-l-4 border-transparent p-2 font-sawarabi text-lg hover:border-teal-600 hover:bg-stone-300"
				>
					<Checkbox {option} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Kinda want to revamp the number input field and also the meal dropdown and maybe use less svg images? -->
<!-- I like melt ui combobox and select? Also skeletons listbox -->
<!-- oooooo grails number input -->
<!-- maybe i should rethink it and use the dropdown for cuisines and something else for food? -->

<style lang="postcss">
	.search-bg {
		background-image: url('$images/search.svg');
		background-repeat: no-repeat;
		background-position: left 95% bottom 50%;
	}
</style>
