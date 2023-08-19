<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { RadioOption } from '$types';

	export let radioOptions: RadioOption[] = [];
	const dispatch = createEventDispatcher();
	let selectedIndex: number = -1;

	const handleRadioOptionPicked = (optionValue: string, optionIndex: number) => {
		selectedIndex = optionIndex;
		dispatch('radioPicked', { value: optionValue });
	};
</script>

<!-- State needs to be passed up + not as responsive as I'd like -->
<div class="flex flex-wrap gap-4 md:flex-nowrap">
	{#each radioOptions as option, index}
		<button
			class="flex w-[30%] flex-col items-center justify-center rounded-xl border-2 border-stone-200 p-4 md:w-2/5"
			class:highlighted-container={selectedIndex === index}
			on:click={() => handleRadioOptionPicked(option.value, index)}
		>
			<div
				class="relative bottom-[0.6em] right-[0.7em] flex h-6 w-6 items-center justify-center self-start rounded-full border-[1px]"
				class:highlighted-circle-border={selectedIndex === index}
			>
				<div class="flex h-4 w-4 rounded-full" class:highlighted-circle={selectedIndex === index} />
			</div>
			<div class=" text-md -mt-1 font-bold md:-mt-2 md:text-xl">{option.heading}</div>
			<div class="text-xs md:text-sm">{option.subHeading}</div>
		</button>
	{/each}
</div>

<style lang="postcss">
	.highlighted-container {
		--tw-bg-opacity: 1;
		border-color: rgb(13 148 136 / var(--tw-bg-opacity));
		background-color: rgb(231 235 228 / var(--tw-bg-opacity));
		transition-duration: 400ms;
	}

	.highlighted-circle-border {
		--tw-bg-opacity: 1;
		border-color: rgb(13 148 136 / var(--tw-bg-opacity));
		transition-duration: 400ms;
	}

	.highlighted-circle {
		--tw-bg-opacity: 1;
		background-color: rgb(13 148 136 / var(--tw-bg-opacity));
		transition-duration: 400ms;
	}
</style>
