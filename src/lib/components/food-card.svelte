<script lang="ts">
	import bulgogi from '../assets/bulgogi.jpeg';
	import turnCard from '../assets/turn-arrow.svg';

	const handleCardTurn = () => {
		console.log('Let em cook');
	};
</script>

<div class="h-[640px] w-[400px] bg-alabaster rounded-4xl shadow-3xl flex items-center flex-col">
	<img src={bulgogi} alt="Bulgogi" class="h-[525px] w-[350px] rounded-4xl mt-[25px]" />
	<span class="font-abhaya text-2xl w-full flex flex-col items-center justify-center mt-3">
		<p>Bulgogi</p>
		<p>Cook Time: 45 min</p>
	</span>
	<!-- <button on:click={handleCardTurn}>
		<img src={turnCard} alt="reverse card button" />
	</button> -->
</div>
  
  
