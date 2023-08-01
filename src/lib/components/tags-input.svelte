<script lang="ts">
	import { slide } from 'svelte/transition';
	import DownArrowIcon from '../assets/arrow_drop_down.svg';
	import UpArrowIcon from '../assets/arrow_drop_up.svg';
	import CautionIcon from '../assets/warning.svg';

	export let name: string = 'Allergies';

	let isDropDownOpen: boolean = false;
	let searchValue: string = '';

	const handleSearchChange = (): void => {
		console.log(searchValue);
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
			on:input={handleSearchChange}
		>
			<input
				type="text"
				class="search-bg rounded-lg bg-stone-300 p-2 text-raisin outline-none"
				placeholder="Search allergies"
				bind:value={searchValue}
			/>
			{#each { length: 10 } as _, index}
				<div
					class="mt-2 flex w-full items-center justify-start gap-1 self-start rounded-r-lg border-l-4 p-2 font-sawarabi text-lg hover:border-teal-600 hover:bg-stone-300"
				>
					<input type="checkbox" id={`vehicle${index}`} name={`vehicle${index}`} value="Bike" />
					<label for={`vehicle${index}`}>Hello world</label>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.search-bg {
		background-image: url('../assets/search.svg');
		background-repeat: no-repeat;
		background-position: right;
	}
</style>
