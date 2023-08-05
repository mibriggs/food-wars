<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import bulgogi from '$images/bulgogi.jpeg';
	import SeeMoreButton from '$components/see-more-button.svelte';

	export let isSelected: boolean = false;
	export let isHidden: boolean = false;
	let isFlipped: boolean = false;
	const dispatch = createEventDispatcher();

	const handleCardFlip = (): void => {
		isFlipped = !isFlipped;
	};
	const handleCardClicked = (): void => {
		dispatch('cardClicked');
	};
</script>

<div
	class="container flex h-full flex-col items-center justify-center gap-[1em]"
	class:hidden-card={isHidden}
>
	<div
		class="card text-md relative flex h-[500px] w-[300px] flex-col rounded-4xl bg-alabaster font-sawarabi font-bold text-raisin shadow-3xl rotateY-180 md:h-[700px] md:w-[400px] md:text-xl"
		class:flipped={isFlipped}
		class:selected={isSelected}
		on:click={handleCardClicked}
		on:keypress={handleCardClicked}
		role="button"
		tabindex="0"
	>
		<div class="front absolute flex h-full w-full flex-col items-center rotateY-180">
			<img
				src={bulgogi}
				alt="Bulgogi"
				class="mt-[25px] h-[350px] w-[250px] rounded-4xl drop-shadow-overlay-alabaster md:mt-[25px] md:h-[525px] md:w-[350px]"
			/>
			<div class="mt-3 flex w-full flex-col items-center justify-center pb-2">
				<div>Bulgogi</div>
				<div>Cook Time: 45 min.</div>
			</div>
			<SeeMoreButton on:click={handleCardFlip}>Read More</SeeMoreButton>
		</div>
		<div class="back absolute flex h-full w-full flex-col items-center justify-center">
			<div>Back Information</div>
			<SeeMoreButton on:click={handleCardFlip}>See Front</SeeMoreButton>
		</div>
	</div>
</div>

<style lang="postcss">
	.container {
		perspective: 100vh;
	}

	.card {
		aspect-ratio: 2.5 / 3.5;
		border-radius: 2em;
		transition: transform 0.4s;
		transform-style: preserve-3d;
		user-select: none;
		cursor: pointer;
	}

	.card.flipped {
		transform: rotateY(0);
	}

	.front,
	.back {
		backface-visibility: hidden;
	}

	.selected {
		border-width: 4px;
		border-color: teal;
	}

	.hidden-card {
		display: none;
	}
</style>
