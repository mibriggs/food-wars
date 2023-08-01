<script lang="ts">
	import alarm from '../lib/assets/alarm.svg';
	import StyledNumber from '$lib/components/styled-number.svelte';
	import StyledDropdown from '$lib/components/styled-dropdown.svelte';
	import BreakfastIcon from '../lib/assets/breakfast.svg';
	import LunchIcon from '../lib/assets/lunch.svg';
	import DinnerIcon from '../lib/assets/dinner.svg';
	import SnackIcon from '../lib/assets/snack.svg';
	import NumberInput from '$lib/components/number-input.svelte';
	import { onMount } from 'svelte';
	import RadioGroup from '$lib/components/radio-group.svelte';
	import type { Option, RadioOption } from '$lib/types/types';
	import TagsInput from '$lib/components/tags-input.svelte';

	const TIMEOUT_LENGTH: number = 60;
	const typewriterMessage: string = 'Welcome to FoodWars!';
	const options: Option[] = [
		{ value: 'breakfast', message: 'Breakfast', imageSource: BreakfastIcon },
		{ value: 'lunch', message: 'Lunch', imageSource: LunchIcon },
		{ value: 'dinner', message: 'Dinner', imageSource: DinnerIcon },
		{ value: 'snack', message: 'Snack', imageSource: SnackIcon }
	];
	const radioOptions: RadioOption[] = [
		{ value: 'low', heading: 'Low', subHeading: 'Less than 500 calories' },
		{ value: 'medium', heading: 'Medium', subHeading: 'Between 500 and 800 calories' },
		{ value: 'high', heading: 'High', subHeading: 'Over than 800 calories' }
	];

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
						<img src={alarm} alt="clock" />
						<div>{timeLabel}</div>
					</div>
				</label>
				<input
					type="range"
					min="15"
					max="480"
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
			<StyledNumber index="4">Any allergies?</StyledNumber>
			<TagsInput />
		</div>

		<div class="text-md flex flex-col gap-3 md:text-lg">
			<StyledNumber index="7">How many options do you want?</StyledNumber>
			<NumberInput min={4} max={64} bind:value={numberOfOptions} />
		</div>
	</div>

	<!-- <div>
		<form>
			<ol class="list-decimal">
				<li>What type of meal are you trying to cook</li> DONE
				<li>How much time do you have?</li> DONE
				<li>How many options do you want?</li> DONE
				<li>Caloric Value?</li> DONE
				<li>Any specific cuisine?</li>
				<li>What ingredients do you have?</li>
				<li>Any allergies?</li>
				<li>Protein?</>
			</ol>
		</form>
	</div> -->

	<div class="flex h-full items-center justify-center">
		<a href="/fight" class="w-fit rounded-2xl bg-teal-600 p-4 text-2xl text-snow">Get Started</a>
	</div>
</div>

<!-- 
    * IG they could just skip the form and if nothing suits them then we could have a modal pop-up and be like are you sure you wanna continue with nothing entered. Yes Surprise me/no im boring
    * What should I cook for lunch?
    * So like we can either have no parameters
    * Or we can have parameters like:
        * Cuisine 
        * Type of meal (Breakfast, Lunch, Dinner etc…)
        * Nutritonal val, (low, balanced, high calorie etc)
        * Time to prep/cook (range with slider)
        * Ingredients I have
        * Number of dishes to pick from (default 16)
        * Protein?
        * Allergies/avoidants?
    * Bracket style!
    * With pictures (1 photo or multiple, carousel style)
    * Ingredients
    * Link to recipe?
    * Link to TikTok videos for recipe? 
-->

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
