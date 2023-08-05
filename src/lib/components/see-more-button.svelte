<script lang="ts">
	import rightArrow from '$images/arrow_right.svg';
</script>

<button on:click|stopPropagation>
	<div
		class="flex w-fit items-center justify-center gap-2 rounded-lg border-2 border-raisin bg-snow px-3 py-1 text-raisin shadow-sm md:px-6 md:py-3"
	>
		<slot />
		<img src={rightArrow} alt="arrow" />
	</div>
</button>
