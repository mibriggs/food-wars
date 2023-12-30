<script lang="ts">
	import type { MultiSelectOption } from '$types/types';
	import { dietsStore, intolerancesStore } from '$stores/stores';
	export let option: MultiSelectOption;

	const handleClick = () => {
		option.checked = !option.checked;
		const currentStore = option.isIntolerance ? intolerancesStore : dietsStore;
		option.checked ? currentStore.addItem(option.value) : currentStore.deleteItem(option.value);
	};
</script>

<button class="flex w-full items-center justify-start gap-2 text-xl" on:click={handleClick}>
	<span
		class:checked={option.checked}
		class="h-6 w-6 rounded-md border-[1px] border-raisin bg-snow"
	/>
	<span>{option.value}</span>
</button>

<style lang="postcss">
	.checked {
		--tw-border-opacity: 1;
		background-color: rgb(13 148 136 / var(--tw-border-opacity));
		background-image: url('$images/check.svg');
		background-repeat: no-repeat;
		background-position: center;
	}
</style>
