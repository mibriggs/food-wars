<script lang="ts">
	import rightArrow from '../assets/arrow_right.svg';
</script>

<button on:click|stopPropagation>
	<div
		class="flex w-fit items-center justify-center gap-2 rounded-lg border-2 border-raisin bg-snow px-6 py-3 text-raisin shadow-sm"
	>
		<slot />
		<img src={rightArrow} alt="arrow" />
	</div>
</button>
