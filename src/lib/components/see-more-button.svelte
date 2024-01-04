<script lang="ts">
	import { MoveRight } from 'lucide-svelte';
</script>

<button on:click|stopPropagation>
	<div
		class="absolute bottom-3 left-[50%] flex w-fit -translate-x-1/2 items-center justify-center gap-2 rounded-lg border-2 border-raisin bg-snow px-3 py-1 text-raisin shadow-sm"
	>
		<slot />
		<MoveRight />
	</div>
</button>
