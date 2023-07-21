<script lang="ts">
	import bulgogi from '../assets/bulgogi.jpeg';
	import SeeMoreButton from './see-more-button.svelte';

	let isFlipped: boolean = false;
	const flipCard = () => {
		isFlipped = !isFlipped;
	};
</script>

<div class="container flex h-full flex-col items-center justify-center">
	<div
		class="card relative flex flex-col rounded-4xl bg-alabaster font-sawarabi text-xl font-bold text-raisin shadow-3xl"
		class:flipped={isFlipped}
	>
		<div class="card-front flex flex-col items-center">
			<img
				src={bulgogi}
				alt="Bulgogi"
				class="mt-[25px] h-[525px] w-[350px] rounded-4xl drop-shadow-overlay-alabaster"
			/>
			<div class="mt-3 flex w-full flex-col items-center justify-center pb-2">
				<div>Bulgogi</div>
				<div>Cook Time: 45 min.</div>
			</div>
			<SeeMoreButton on:click={flipCard}>Read More</SeeMoreButton>
		</div>
		<div class="card-back flex flex-col items-center justify-center">
			<div>Back Information</div>
			<SeeMoreButton on:click={flipCard}>See Front</SeeMoreButton>
		</div>
	</div>
</div>

<style>
	/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
	.container {
		background-color: transparent;
		perspective: 100vh; /* Remove this if you don't want the 3D effect */
		gap: 1em;
	}

	/* This container is needed to position the front and back side */
	.card {
		height: 700px;
		width: 400px;
		text-align: center;
		transition: transform 0.6s;
		transform-style: preserve-3d;
		user-select: none;
		cursor: pointer;
	}

	/* Do an horizontal flip when you move the mouse over the flip box container */
	.flipped {
		transform: rotateY(180deg);
	}

	/* Position the front and back side */
	.card-front,
	.card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}

	/* Style the back side */
	.card-back {
		transform: rotateY(180deg);
	}
</style>
