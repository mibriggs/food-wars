<script lang="ts">
	import { Chasing } from 'svelte-loading-spinners';
	import { navigating } from '$app/stores';
	import { AlarmClock } from 'lucide-svelte';
	import MultiSelect from '$components/multi-select.svelte';
	import NumberInput from '$components/number-input.svelte';
	import RadioGroup from '$components/radio-group.svelte';
	import StyledNumber from '$components/styled-number.svelte';
	import StyledDropdown from '$components/styled-dropdown.svelte';
	import { onMount } from 'svelte';
	import type { Meal, RadioOption } from '$types/types';
	import InputTags from '$components/input-tags.svelte';
	import Chips from '$components/chips.svelte';
	import { intolerancesStore, dietsStore, cuisinesStore, ingredientsStore } from '$stores/stores';
	import { enhance } from '$app/forms';

	const TIMEOUT_LENGTH: number = 60;
	const typewriterMessage: string = 'Welcome to FoodWars!';
	const options: Meal[] = ['breakfast', 'lunch', 'dinner', 'snack'];
	const radioOptions: RadioOption[] = [
		{ value: 'low', heading: 'Low', subHeading: 'Less than 500 calories' },
		{ value: 'medium', heading: 'Medium', subHeading: 'Around 500-800 calories' },
		{ value: 'high', heading: 'High', subHeading: 'Greater than 800 calories' }
	];

	//allergies is in a store, don't forget to pass along
	let typedSoFar: string = '';
	let index: number = 0;
	let timeInMinutes: number = 15;
	let mealType: string;
	let caloricChoice: string;
	let numberOfOptions: number = 4;

	const setTypewriterMessage = (): void => {
		if (index < typewriterMessage.length) {
			typedSoFar += typewriterMessage.charAt(index);
			index++;
			setTimeout(setTypewriterMessage, TIMEOUT_LENGTH);
		}
	};

	const cleanUpTypewriter = (): void => {
		typedSoFar = '';
		index = 0;
	};

	onMount(() => {
		setTypewriterMessage();
		return cleanUpTypewriter;
	});

	const getHours = (): string => {
		const MINUTES_IN_HOUR = 60;
		const hours = Math.trunc(timeInMinutes / MINUTES_IN_HOUR);
		const minutes = timeInMinutes % MINUTES_IN_HOUR;
		let timeInStringFormat: string = '';

		if (timeInMinutes === 60) {
			timeInStringFormat = '1 Hour';
		} else if (timeInMinutes % MINUTES_IN_HOUR == 0) {
			timeInStringFormat = `${hours} Hours`;
		} else {
			timeInStringFormat = `${hours} ${hours === 1 ? 'Hour' : 'Hours'}, ${minutes} minutes`;
		}
		return timeInStringFormat;
	};

	const handleDropdownValue = (event: CustomEvent<{ value: string }>): void => {
		mealType = event.detail.value;
	};

	const handleRadioValue = (event: CustomEvent<{ value: string }>): void => {
		caloricChoice = event.detail.value;
	};

	$: timeLabel = timeInMinutes < 60 ? `${timeInMinutes} Minutes` : getHours();
</script>

{#if $navigating}
	<div
		class="flex h-screen flex-col items-center justify-center gap-4 text-center font-sawarabi text-3xl font-bold text-raisin"
	>
		<div>Loading Data...</div>
		<Chasing size="60" color="#0D9488" unit="px" duration="1s" />
	</div>
{:else}
	<div class="flex h-screen flex-col gap-8 px-8 py-16 font-sawarabi text-raisin md:px-40">
		<div class="flex flex-col gap-2">
			<h1 class="text-2xl font-bold md:text-4xl lg:text-5xl">{typedSoFar}</h1>
			<h2 class="text-md italic md:text-xl">
				An interactive web app to help you decide what to cook when you have no idea
			</h2>
		</div>

		<div class="flex flex-col gap-14">
			<div class="text-md flex flex-col gap-5 md:text-lg">
				<StyledNumber index="1">How much time do you have?</StyledNumber>
				<div class="flex flex-col gap-2">
					<label for="time" class="self-center">
						<div class="flex items-center justify-center gap-2">
							<AlarmClock />
							<div>{timeLabel}</div>
						</div>
					</label>
					<input
						type="range"
						min="15"
						max="240"
						step="15"
						id="time"
						name="time"
						bind:value={timeInMinutes}
					/>
				</div>
			</div>

			<div class="text-md flex flex-col gap-3 md:text-lg">
				<StyledNumber index="2">What kind of food do you want?</StyledNumber>
				<StyledDropdown {options} on:selectionMade={handleDropdownValue} />
			</div>

			<div class="text-md flex flex-col gap-3 md:text-lg">
				<StyledNumber index="3">Caloric value?</StyledNumber>
				<RadioGroup {radioOptions} on:radioPicked={handleRadioValue} />
			</div>

			<div class="text-md flex flex-col gap-3 md:text-lg">
				<StyledNumber index="4">Any dietary restrictions?</StyledNumber>
				<MultiSelect />
			</div>

			<div class="text-md flex flex-col gap-3 md:text-lg">
				<StyledNumber index="5">Cuisines?</StyledNumber>
				<Chips />
			</div>

			<div class="text-md flex flex-col gap-3 md:text-lg">
				<StyledNumber index="6">What ingredients do you have?</StyledNumber>
				<InputTags />
			</div>

			<div class="text-md flex flex-col gap-3 md:text-lg">
				<StyledNumber index="7">How many options do you want?</StyledNumber>
				<NumberInput min={4} max={64} bind:value={numberOfOptions} />
			</div>
		</div>

		<form method="post" action="?/getMeals" class="flex justify-end pb-4" use:enhance>
			<input
				type="hidden"
				name="mealObject"
				value={JSON.stringify({
					time: timeInMinutes,
					mealType: mealType,
					calories: caloricChoice,
					intolerances: $intolerancesStore,
					diets: $dietsStore,
					cuisines: $cuisinesStore,
					ingredients: $ingredientsStore,
					count: numberOfOptions
				})}
			/>
			<button class="w-fit rounded-xl bg-teal-600 px-4 py-2 text-xl text-snow">
				Get Started
			</button>
		</form>
	</div>
{/if}

<style lang="postcss">
	/* Getting rid of base range styling */
	input[type='range'] {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background: transparent;
		cursor: pointer;
		outline: none;
	}

	/* Webkit styling (AKA Chrome, Safari, and Edge) */
	input[type='range']::-webkit-slider-runnable-track {
		-webkit-appearance: none;
		background: #e7ebe4;
		height: 20px;
		border-radius: 16px;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		height: 32px;
		width: 32px;
		background: #fcf7f8;
		margin-top: -6px;
		border: solid;
		border-radius: 9999px;
		border-width: 2px;
		border-color: #332e3c;
	}

	/* Firefox Styling */
	input[type='range']::-moz-range-track {
		-moz-appearance: none;
		background: #e7ebe4;
		height: 20px;
		border-radius: 16px;
	}

	input[type='range']::-moz-range-thumb {
		-moz-appearance: none;
		appearance: none;
		height: 32px;
		width: 32px;
		background: #fcf7f8;
		border: solid;
		border-radius: 9999px;
		border-width: 2px;
		border-color: #332e3c;
	}

	/* Styling for idek what */
	input[type='range']::-ms-track {
		appearance: none;
		background: #e7ebe4;
		height: 20px;
		border-radius: 16px;
	}
	input[type='range']::-ms-thumb {
		appearance: none;
		height: 32px;
		width: 32px;
		background: #fcf7f8;
		border: solid;
		border-radius: 9999px;
		border-width: 2px;
		border-color: #332e3c;
	}
</style>
