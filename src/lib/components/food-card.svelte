<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import bulgogi from '../assets/bulgogi.jpeg';
	import SeeMoreButton from './see-more-button.svelte';

	export let isSelected: boolean = false;
	let isFlipped: boolean = false;
	const dispatch = createEventDispatcher();

	const handleCardFlip = () => {
		isFlipped = !isFlipped;
	};
	const handleCardClicked = () => {
		dispatch('cardClicked');
	};
</script>

<div class="container flex h-full flex-col items-center justify-center">
	<div
		class="card relative flex flex-col rounded-4xl bg-alabaster font-sawarabi text-xl font-bold text-raisin shadow-3xl rotateY-180"
		class:flipped={isFlipped}
		class:selected={isSelected}
		on:click={handleCardClicked}
		on:keypress={handleCardClicked}
	>
		<div class="front absolute flex h-full w-full flex-col items-center rotateY-180">
			<img
				src={bulgogi}
				alt="Bulgogi"
				class="mt-[25px] h-[525px] w-[350px] rounded-4xl drop-shadow-overlay-alabaster"
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
		gap: 1em;
		perspective: 100vh;
	}

	.card {
		aspect-ratio: 2.5 / 3.5;
		border-radius: 2em;
		transition: transform 0.4s;
		height: 700px;
		width: 400px;
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
</style>
