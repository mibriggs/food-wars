<script lang="ts">
	import { RefreshCcw, ChevronLeft, ChevronRight, StepForward } from 'lucide-svelte';
	import FoodCard from '$components/food-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: console.log(data.meals);

	let isLeftSelected: boolean = false;
	let isRightSelected: boolean = false;
	let isOnSecondCard: boolean = false;
	let screenWidth: number;
	const MAX_WIDTH: number = 1000;

	const handleSelection = (isRightCard: boolean): void => {
		isRightSelected = isRightCard;
		isLeftSelected = !isRightCard;
	};

	const setUpCards = () => {
		if (isRightSelected) {
			isOnSecondCard = true;
		} else {
			isOnSecondCard = false;
		}
	};

	const tearDownCards = () => {
		isOnSecondCard = false;
	};

	$: isNextButtonHidden = !isLeftSelected && !isRightSelected;
	$: screenWidth < MAX_WIDTH ? setUpCards() : tearDownCards();
</script>

<svelte:window bind:innerWidth={screenWidth} />
<div class="flex h-full flex-col items-center gap-8 font-sawarabi">
	<a href="/" class="self-start p-4">
		<RefreshCcw size="28" />
	</a>

	<div class="flex flex-col items-center justify-center gap-1">
		<h1 class=" text-2xl font-bold md:text-3xl">What would you like to eat?</h1>
		<h2 class="text-xl italic">Please choose one</h2>
	</div>

	<div class="hidden flex-row items-center gap-32 semi-md:flex">
		<FoodCard isSelected={isLeftSelected} on:cardClicked={() => handleSelection(false)} />
		<FoodCard isSelected={isRightSelected} on:cardClicked={() => handleSelection(true)} />
	</div>

	<div class="flex flex-col items-center justify-center semi-md:hidden">
		<FoodCard
			isHidden={isOnSecondCard}
			isSelected={isLeftSelected}
			on:cardClicked={() => handleSelection(false)}
		/>
		<FoodCard
			isHidden={!isOnSecondCard}
			isSelected={isRightSelected}
			on:cardClicked={() => handleSelection(true)}
		/>
		<div class="flex items-center justify-center gap-2 py-5 font-sawarabi text-xl">
			<button on:click={() => (isOnSecondCard = !isOnSecondCard)}>
				<ChevronLeft />
			</button>
			{isOnSecondCard ? 2 : 1}/2
			<button on:click={() => (isOnSecondCard = !isOnSecondCard)}>
				<ChevronRight />
			</button>
		</div>
	</div>

	<button
		class:conditionally-hidden={isNextButtonHidden}
		class="text-md m-4 self-end rounded-xl border-2 border-raisin bg-alabaster px-4 py-2 shadow-lg sm:text-xl"
	>
		<div class="flex items-center justify-center gap-2 text-raisin">
			<div>Continue With Bulgogi {isLeftSelected ? '1' : '2'}</div>
			<StepForward />
		</div>
	</button>
</div>

<style lang="postcss">
	.conditionally-hidden {
		visibility: hidden;
	}
</style>
