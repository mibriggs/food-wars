<script lang="ts">
	import bulgogi from '$images/bulgogi.jpeg';
	import SeeMoreButton from '$components/see-more-button.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { MealObject } from '$types/schemas';

	export let isSelected: boolean = false;
	export let isHidden: boolean = false;
	export let mealInfo: MealObject;
	export let imageUrl: string = bulgogi;
	export let foodTitle: string = 'Bulgogi';
	export let cookTime: number = 45;

	let isFlipped: boolean = false;
	const dispatch = createEventDispatcher();

	const handleCardFlip = (): void => {
		isFlipped = !isFlipped;
	};

	const handleCardClicked = (): void => {
		dispatch('cardClicked');
	};

	const createNutrientString = (nutrient: MealObject["nutrition"]["nutrients"][0]): string => {
		return `${Math.round(nutrient.amount)} ${nutrient.name}`;
	}

	const getIngredients = (analyzedInstructions: MealObject['analyzedInstructions'], separator: string): string => {
		const ingsNested = analyzedInstructions?.map(analyzedInstruction => {
			return analyzedInstruction.steps.map(step => {
				return step.ingredients;
			})
		});

		const ingsObjArr = ingsNested?.flat().flat()
		const ingNames = ingsObjArr?.map(ing => ing.name);
		return ingNames? [... new Set(ingNames)].join(separator) : ""
	}

	const getNutrients = (nutrients:  MealObject["nutrition"]["nutrients"]): string => {
		const nutrientsArr = nutrients.map(nutrient => createNutrientString(nutrient));
		return nutrientsArr.join(", ");
	}
</script>

<div
	class="container flex h-full flex-col items-center justify-center gap-[1em]"
	class:hidden-card={isHidden}
>
	<div
		class="card text-md relative flex h-[520px] w-[300px] flex-col rounded-4xl bg-alabaster font-sawarabi font-bold text-raisin shadow-3xl rotateY-180 md:h-[710px] md:w-[400px] md:text-xl"
		class:flipped={isFlipped}
		class:selected={isSelected}
		on:click={handleCardClicked}
		on:keypress={handleCardClicked}
		role="button"
		tabindex="0"
	>
		<div class="front absolute flex h-full w-full flex-col items-center rotateY-180">
			<img
				src={imageUrl}
				alt="Bulgogi"
				class="mt-[25px] h-[350px] w-[250px] rounded-4xl object-cover drop-shadow-overlay-alabaster md:mt-[25px] md:h-[525px] md:w-[350px]"
			/>
			<div class="text-md mt-3 flex w-full flex-col items-center justify-center pb-2 text-center">
				<div>{foodTitle}</div>
				<div>Cook Time: {cookTime} min.</div>
			</div>
			<SeeMoreButton on:click={handleCardFlip}>Read More</SeeMoreButton>
		</div>
		<div
			class="back absolute flex h-full w-full flex-col items-center justify-start"
			class:hidden-back={!isFlipped}
		>
			<div class="absolute left-[20%] top-[5%] -translate-x-[20%] -translate-y-[5%] pl-8 text-lg">
				<ul class="w-full list-disc">
					<li>Total Servings: {mealInfo.servings}</li>
					<li>Cost per serving: ${(mealInfo.pricePerServing/100).toFixed(2)}</li>
					<li>Prep Time: {mealInfo.preparationMinutes} minutes</li>
					<li>Cook Time: {mealInfo.cookingMinutes} minutes</li>
					<li>Cuisines: {mealInfo.cuisines.length > 0 ? mealInfo.cuisines.join(', ') : "No listed cuisines"}</li>
					<li>Dish Types: {mealInfo.dishTypes.length > 0 ? mealInfo.dishTypes.join(', ') : "No listed dish types"}</li>
					<li>Diets: {mealInfo.diets.length > 0 ? mealInfo.diets.join(', ') : "No listed diets"}</li>
					{#if mealInfo.analyzedInstructions}
						<li>Ingredients: {getIngredients(mealInfo.analyzedInstructions, ", ")}</li>
					{/if}
					<li>Nutrients: {getNutrients(mealInfo.nutrition.nutrients)}</li>
					<li><a on:click|stopPropagation href={mealInfo.sourceUrl} class=" text-teal-600 underline">View full recipe</a></li>
					<li><a on:click|stopPropagation href={mealInfo.spoonacularSourceUrl} class=" text-teal-600 underline">View spoonacular listing</a></li>
				</ul>
			</div>
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
		--tw-border-opacity: 1;
		border-color: rgb(13 148 136 / var(--tw-border-opacity));
		border-width: 4px;
	}

	.hidden-card {
		display: none;
	}

	.hidden-back {
		display: none;
	}
</style>
