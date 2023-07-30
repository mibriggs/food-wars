<script lang="ts">
	import type { RadioOption } from '$lib/types/types';
	import { createEventDispatcher } from 'svelte';

	export let radioOptions: RadioOption[] = [];
    const dispatch = createEventDispatcher();
	let selectedIndex: number = -1;

    const handleRadioOptionPicked = (optionValue: string, optionIndex: number) => {
        selectedIndex = optionIndex;
        dispatch('radioPicked', {value: optionValue});
    }
</script>

<!-- State needs to be passed up + not as responsive as I'd like -->
<div class="flex gap-4 flex-wrap md:flex-nowrap">
	{#each radioOptions as option, index}
		<button
			class="flex w-2/5 flex-col items-center justify-center rounded-xl border-[3px] border-stone-200 p-4"
			class:highlighted-container={selectedIndex === index}
			on:click={() => handleRadioOptionPicked(option.value, index)}
		>
			<div
				class=" flex h-5 w-5 items-center justify-center self-start rounded-full border-[1px]"
				class:highlighted-circle-border={selectedIndex === index}
			>
				<div class="h-5/6 w-5/6 rounded-full" class:highlighted-circle={selectedIndex === index} />
			</div>
			<div class=" -mt-1 md:-mt-2 md:text-xl font-bold text-md">{option.heading}</div>
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
