<script lang="ts">
	import type { RadioOption } from "$lib/types/types";

    let selectedIndex: number = -1;
    export let radioOptions: RadioOption[] = [];
</script>

<div class="flex gap-4">
    {#each radioOptions as option, index}
    <button
	class="flex w-2/5 flex-col items-center justify-center rounded-xl border-2 border-stone-200 p-4"
    class:highlighted-container={selectedIndex === index}
    on:click={() => selectedIndex = index}
>
	<div class=" flex h-5 w-5 items-center justify-center self-start rounded-full border-[1px]"
    class:highlighted-circle-border={selectedIndex === index}>
		<div class="h-5/6 w-5/6 rounded-full"  class:highlighted-circle={selectedIndex === index}/>
	</div>
	<div class=" text-xl font-bold">{option.heading}</div>
	<div class="text-sm">{option.subHeading}</div>
</button>
    {/each}
</div>


<style lang="postcss">
    .highlighted-container {
        --tw-bg-opacity: 1;
        border-color: rgb(13 148 136 / var(--tw-bg-opacity));
        background-color: rgb(231 235 228 / var(--tw-bg-opacity));
    }

    .highlighted-circle-border {
        --tw-bg-opacity: 1;
        border-color: rgb(13 148 136 / var(--tw-bg-opacity));
    }

    .highlighted-circle {
        --tw-bg-opacity: 1;
        background-color: rgb(13 148 136 / var(--tw-bg-opacity));
    }
</style>