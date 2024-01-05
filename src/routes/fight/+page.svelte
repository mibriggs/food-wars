<script lang="ts">
	import {
		RefreshCcw,
		ChevronLeft,
		ChevronRight,
		StepForward,
		HeartCrack,
		Crown
	} from 'lucide-svelte';
	import FoodCard from '$components/food-card.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let isLeftSelected: boolean = false;
	let isRightSelected: boolean = false;
	let isOnSecondCard: boolean = false;
	let screenWidth: number;
	const MAX_WIDTH: number = 1000;

	let pointer1 = 0;
	let pointer2 = 1;
	let winningIndex: number;

	const handleSelection = (isRightCard: boolean): void => {
		isRightSelected = isRightCard;
		isLeftSelected = !isRightCard;
	};

	const handleClick = () => {
		if (data.meals && (pointer1 === data.meals.length - 1 || pointer2 === data.meals.length - 1)) {
			// game over we want to display the winning card
			winningIndex = isLeftSelected ? pointer1 : pointer2;
		} else {
			if (isLeftSelected) {
				pointer2 = Math.max(pointer1, pointer2) + 1;
			} else {
				pointer1 = Math.max(pointer1, pointer2) + 1;
			}
		}
		isLeftSelected = false;
		isRightSelected = false;
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
	<!-- <Crown /> -->
	{#if data.meals && data.meals.length === 0}
		<span class="flex items-center gap-2">
			<div class=" text-3xl font-bold">No Results found please try again</div>
			<HeartCrack size="32" />
		</span>
	{:else if data.meals && winningIndex !== undefined}
		<div class="flex flex-col items-center gap-4">
			<span class="flex items-center gap-2 text-3xl font-bold">
				<Crown size="32"/>
				Winner:
			</span>
			<FoodCard
				imageUrl={data.meals[winningIndex].image}
				foodTitle={data.meals[winningIndex].title}
				cookTime={data.meals[winningIndex].readyInMinutes}
				mealInfo={data.meals[winningIndex]}
			/>
		</div>
	{:else if data.meals}
		<div class="flex flex-col items-center justify-center gap-1">
			<h1 class=" text-2xl font-bold md:text-3xl">What would you like to eat?</h1>
			<h2 class="text-xl italic">Please choose one</h2>
		</div>

		<div class="hidden flex-row items-center gap-32 semi-md:flex">
			<FoodCard
				isSelected={isLeftSelected}
				imageUrl={data.meals[pointer1].image}
				foodTitle={data.meals[pointer1].title}
				cookTime={data.meals[pointer1].readyInMinutes}
				mealInfo={data.meals[pointer1]}
				on:cardClicked={() => handleSelection(false)}
			/>
			<FoodCard
				isSelected={isRightSelected}
				imageUrl={data.meals[pointer2].image}
				foodTitle={data.meals[pointer2].title}
				cookTime={data.meals[pointer2].readyInMinutes}
				mealInfo={data.meals[pointer2]}
				on:cardClicked={() => handleSelection(true)}
			/>
		</div>

		<div class="flex flex-col items-center justify-center semi-md:hidden">
			<FoodCard
				isHidden={isOnSecondCard}
				isSelected={isLeftSelected}
				imageUrl={data.meals[pointer1].image}
				foodTitle={data.meals[pointer1].title}
				cookTime={data.meals[pointer1].readyInMinutes}
				mealInfo={data.meals[pointer1]}
				on:cardClicked={() => handleSelection(false)}
			/>
			<FoodCard
				isHidden={!isOnSecondCard}
				isSelected={isRightSelected}
				imageUrl={data.meals[pointer2].image}
				foodTitle={data.meals[pointer2].title}
				cookTime={data.meals[pointer2].readyInMinutes}
				mealInfo={data.meals[pointer2]}
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
			disabled={winningIndex !== undefined}
			on:click={handleClick}
		>
			<div class="flex items-center justify-center gap-2 text-raisin">
				<div>Continue with option {isLeftSelected ? '1' : '2'}?</div>
				<StepForward />
			</div>
		</button>
	{/if}
</div>

<style lang="postcss">
	.conditionally-hidden {
		visibility: hidden;
	}
</style>
