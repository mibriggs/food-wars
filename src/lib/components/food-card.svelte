<script lang="ts">
	import bulgogi from '../assets/bulgogi.jpeg';
	import turnCard from '../assets/turn-arrow.svg';

	const handleCardTurn = () => {
		console.log('Let em cook');
	};
</script>

<div class="flex h-[640px] w-[400px] flex-col items-center rounded-4xl bg-alabaster shadow-3xl">
	<img src={bulgogi} alt="Bulgogi" class="mt-[25px] h-[525px] w-[350px] rounded-4xl" />
	<div class="mt-3 flex w-full flex-col items-center justify-center font-abhaya text-2xl">
		<div>Bulgogi</div>
		<div>Cook Time: 45 min</div>
	</div>
	<!-- <button on:click={handleCardTurn}>
		<img src={turnCard} alt="reverse card button" />
	</button> -->
</div>
