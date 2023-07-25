<script lang="ts">
	export let index: string;
</script>

<div class="flex items-center gap-2">
	<div
		class="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-center text-lg font-bold text-snow"
	>
		{index}
	</div>
	<div class="text-md font-semibold md:text-xl">
		<slot />
	</div>
</div>
