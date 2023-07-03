<script lang="ts">
	import bulgogi from '../assets/bulgogi.jpeg';
	import turnCard from '../assets/turn-arrow.svg';

	let isFlipped: boolean = false;

	const handleCardFlip = () => {
		isFlipped = !isFlipped;
		console.log(isFlipped);
		console.log(`${isFlipped ? 'Back' : 'Front'}`);
	};
</script>

<div class="container flex h-full flex-col items-center justify-center">
	<div class="flex flex-col items-center justify-center gap-3">
		<div
			class="card relative h-[640px] w-[400px] rounded-4xl bg-alabaster font-sawarabi text-xl font-bold text-jet shadow-3xl rotateY-180"
			class:flipped={isFlipped}
		>
			<div class="front absolute flex h-full w-full flex-col items-center rotateY-180">
				<img
					src={bulgogi}
					alt="Bulgogi"
					class="mt-[25px] h-[525px] w-[350px] rounded-4xl drop-shadow-overlay-alabaster"
				/>
				<div class="mt-3 flex w-full flex-col items-center justify-center">
					<div>Bulgogi</div>
					<div>Cook Time: 45 min.</div>
				</div>
			</div>
			<div class="back absolute flex h-full w-full items-center justify-center">
				Back Information
			</div>
		</div>
		<button on:click={handleCardFlip}>
			<img src={turnCard} alt="reverse card button" />
		</button>
	</div>
</div>

<!-- <script>
	let flipped = false;
</script>

<div class="container">
	Flip the card
	<button
		class="card"
		class:flipped={flipped}
		on:click={() => flipped = !flipped}
	>
		<div class="front">
			<span class="symbol">♠</span>
		</div>
		<div class="back">
			<div class="pattern"></div>
		</div>
	</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		height: 100%;
		align-items: center;
		justify-content: center;
		perspective: 100vh;
	}

	.card {
		position: relative;
		aspect-ratio: 2.5 / 3.5;
		font-size: min(1vh, 0.25rem);
		height: 80em;
		background: var(--bg-1);
		border-radius: 2em;
		transform: rotateY(180deg);
		transition: transform 0.4s;
		transform-style: preserve-3d;
		padding: 0;
		user-select: none;
		cursor: pointer;
	}

	.card.flipped {
		transform: rotateY(0);
	}

	.front, .back {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 2em;
		border: 1px solid var(--fg-2);
		box-sizing: border-box;
		padding: 2em;
	}

	.front {
		background: url(./svelte-logo.svg) no-repeat 5em 5em, url(./svelte-logo.svg) no-repeat calc(100% - 5em) calc(100% - 5em);
		background-size: 8em 8em, 8em 8em;
	}

	.back {
		transform: rotateY(180deg);
	}

	.symbol {
		font-size: 30em;
		color: var(--fg-1);
	}

	.pattern {
		width: 100%;
		height: 100%;
		background-color: var(--bg-2);
		/* pattern from https://projects.verou.me/css3patterns/#marrakesh */
		background-image:
		radial-gradient(var(--bg-3) 0.9em, transparent 1em),
		repeating-radial-gradient(var(--bg-3) 0, var(--bg-3) 0.4em, transparent 0.5em, transparent 2em, var(--bg-3) 2.1em, var(--bg-3) 2.5em, transparent 2.6em, transparent 5em);
		background-size: 3em 3em, 9em 9em;
		background-position: 0 0;
		border-radius: 1em;
	}
</style> -->

<style lang="postcss">
	.container {
		gap: 1em;
		perspective: 100vh;
	}

	/* .flipper {
		transform-style: preserve-3d;
		position: fixed;
		bottom: 0.3em;
		left: 1em;
	} */

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
