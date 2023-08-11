<script lang="ts">
	import CautionIcon from '$images/warning.svg';
	import DownArrowIcon from '$images/arrow_drop_down.svg';
	import UpArrowIcon from '$images/arrow_drop_up.svg';
	import { slide } from 'svelte/transition';
	import type { MultiSelectOption } from '$types';
	import Checkbox from './checkbox.svelte';

	export let name: string = 'Restrictions';
	export let options: MultiSelectOption[] = [
		// Dummy filler values
		{ id: 'halal', value: 'Halal', checked: false },
		{ id: 'kosher', value: 'Kosher', checked: false },
		{ id: 'vegan', value: 'Vegan', checked: false },
		{ id: 'vegetarian', value: 'Vegetarian', checked: false },
		{ id: 'pescetarian', value: 'Pescetarian', checked: false },
		{ id: 'peanut', value: 'Peanut', checked: false },
		{ id: 'shellfish', value: 'Shellfish', checked: false },
		{ id: 'gluten-free', value: 'Gluten Free', checked: false },
		{ id: 'dairy-free', value: 'Dairy Free', checked: false }
	];

	let filteredList: MultiSelectOption[] = options;
	let isDropDownOpen: boolean = false;
	let searchValue: string = '';

	const handleSearchChange = (): void => {
		filteredList = options.filter((listOption) =>
			listOption.value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
		);
	};
</script>

<div class="flex w-full flex-col gap-2 md:w-6/12 lg:w-1/4">
	<button
		class="flex w-full items-center justify-between rounded-lg border-2 border-transparent bg-stone-200 p-2 hover:border-teal-600"
		on:click={() => (isDropDownOpen = !isDropDownOpen)}
	>
		<div class="flex items-center gap-2 pl-2">
			<img src={CautionIcon} alt="" />
			<div>{name}</div>
		</div>
		<img src={isDropDownOpen ? UpArrowIcon : DownArrowIcon} alt="arrow icon" />
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

<style lang="postcss">
	.search-bg {
		background-image: url('$images/search.svg');
		background-repeat: no-repeat;
		background-position: left 95% bottom 50%;
	}
</style>
