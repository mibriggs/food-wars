<script lang="ts">
	import CautionIcon from '$images/warning.svg';
	import DownArrowIcon from '$images/arrow_drop_down.svg';
	import UpArrowIcon from '$images/arrow_drop_up.svg';
	import { slide } from 'svelte/transition';
	import type { MultiSelectOption } from '$types';

	export let name: string = 'Allergies';
	export let options: MultiSelectOption[] = [
		// Dummy filler values
		{ id: 'halal', value: 'Halal' },
		{ id: 'vegan', value: 'Vegan' },
		{ id: 'gluten-free', value: 'Gluten Free' },
		{ id: 'dairy-free', value: 'Dairy Free' }
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
	<div
		class="flex w-full items-center justify-between rounded-lg border-2 border-transparent bg-stone-200 p-2 hover:border-teal-600"
	>
		<div class="flex items-center gap-2 pl-2">
			<img src={CautionIcon} alt="" />
			<div>{name}</div>
		</div>
		<button on:click={() => (isDropDownOpen = !isDropDownOpen)}>
			<img src={isDropDownOpen ? UpArrowIcon : DownArrowIcon} alt="arrow icon" />
		</button>
	</div>

	{#if isDropDownOpen}
		<div
			class="flex h-56 w-full flex-col overflow-y-auto rounded-lg bg-stone-200 p-2 text-lg text-raisin"
			in:slide
			out:slide
		>
			<input
				type="text"
				class="search-bg rounded-lg bg-stone-300 p-2 text-raisin outline-none"
				placeholder="Search allergies"
				bind:value={searchValue}
				on:input={handleSearchChange}
			/>
			{#each filteredList as option, index}
				<div
					class="mt-2 flex w-full items-center justify-start gap-1 self-start rounded-r-lg border-l-4 p-2 font-sawarabi text-lg hover:border-teal-600 hover:bg-stone-300 border-transparent"
				>
					<input type="checkbox" id={option.id} name={option.id} value={option.id} class="material-symbols-outlined" />
					<label for={option.id}>{`${option.value}`}</label>
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

	input[type='checkbox'] {
		--tw-border-opacity: 1;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 1.5rem;
		height: 1.5rem;
		background-color: rgb(252 247 248 / var(--tw-bg-opacity));
		border-radius: 0.375rem;
		cursor: pointer;
	}

	input[type='checkbox']:hover {
		--tw-border-opacity: 1;
		border-width: 1px;
		border-color: rgb(51 46 60 / var(--tw-border-opacity));
	}

	input[type='checkbox'].material-symbols-outlined:checked {
		--tw-border-opacity: 1;
		border-width: 1px;
		border-color: rgb(51 46 60 / var(--tw-text-opacity));
		background-color: rgb(13 148 136 / var(--tw-border-opacity));
		background-image: url('$images/check.svg');
		background-repeat: no-repeat;
		background-position: center;
	}
</style>