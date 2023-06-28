<script lang="ts">
	import bulgogi from '../assets/bulgogi.jpeg';
	import turnCard from '../assets/turn-arrow.svg';
	import { fade } from 'svelte/transition';

	let isFacingFront = true;

	const handleCardTurn = () => {
		isFacingFront = !isFacingFront;
	};

	// function flip(node: any, { duration = 300 }) {
	//   return {
	//     duration,
	//     css: (t: number) => 'transform: rotateY( 180deg ); transition: transform 0.5s; perspective: 500px; transform-style: preserve-3d;'
	//   };
	// }
</script>

<!-- {#if isFacingFront} -->
	<div
		class={`flex h-[640px] w-[400px] flex-col items-center rounded-4xl bg-alabaster font-abhaya text-2xl shadow-3xl ${isFacingFront? '-rotateY-180 duration-1000' : 'rotateY-180 duration-1000'}`}
	>
		<img src={bulgogi} alt="Bulgogi" class={`mt-[25px] h-[525px] w-[350px] rounded-4xl ${!isFacingFront? 'hidden' : ''}`} />
		<div class={`mt-3 flex w-full flex-col items-center justify-center ${!isFacingFront? 'hidden' : ''}`}>
			<div>Bulgogi</div>
			<div class="relative flex w-full flex-row items-center justify-center">
				<div class="text-center">Cook Time: 45 min</div>
				<button on:click={handleCardTurn} class="absolute -bottom-3 right-4">
					<img src={turnCard} alt="reverse card button" />
				</button>
			</div>
		</div>
		<div class={`${isFacingFront? 'hidden' : 'rotateY-180'}`}>
			Hello world
		</div>
		<button on:click={handleCardTurn} class={`absolute bottom-[2px] left-4 ${isFacingFront? 'hidden' : 'rotateY-180'}`}>
			<img src={turnCard} alt="reverse card button" />
		</button>
	</div>
<!-- {:else} -->
<!-- {/if}
<div
	class='relative flex h-[640px] w-[400px] flex-col items-center rounded-4xl bg-alabaster font-abhaya text-2xl shadow-3xl'
>
	Backside with recipe info
	<button on:click={handleCardTurn} class="absolute bottom-[2px] right-4">
		<img src={turnCard} alt="reverse card button" />
	</button>
</div> -->
