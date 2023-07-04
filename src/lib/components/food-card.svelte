<script lang="ts">
	import bulgogi from '../assets/bulgogi.jpeg';
	import SeeMoreButton from './see-more-button.svelte';

	let isFlipped: boolean = false;

	const handleCardFlip = () => {
		isFlipped = !isFlipped;
		console.log(isFlipped);
		console.log(`${isFlipped ? 'Back' : 'Front'}`);
	};
</script>

<div class="container flex h-full flex-col items-center justify-center" on:focus>
	<div class="flex flex-col items-center justify-center gap-3">
		<div
		class="card relative flex h-[700px] w-[400px] flex-col rounded-4xl bg-alabaster font-sawarabi text-xl font-bold text-raisin shadow-3xl rotateY-180"
		class:flipped={isFlipped}
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
				<SeeMoreButton on:click={handleCardFlip} />
			</div>
			<div class="back absolute flex h-full w-full items-center justify-center flex-col">
				<div>Back Information</div>
				<SeeMoreButton on:click={handleCardFlip} />
			</div>
		</div>
		<!-- <button on:click={handleCardFlip}>
			<img src={turnCard} alt="reverse card button" />
		</button> -->
	</div>
</div>

<style lang="postcss">
	.container {
		gap: 1em;
		perspective: 100vh;
	}

	.card {
		/* aspect-ratio: 2.5 / 3.5; */
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
</style>
