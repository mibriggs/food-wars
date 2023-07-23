<script lang="ts">
	import { onMount } from 'svelte';
	import alarm from '../lib/assets/alarm.svg';
	import StyledNumber from '$lib/components/styled-number.svelte';

	const TIMEOUT_LENGTH: number = 60;
	const typewriterMessage: string = 'Welcome to FoodWars!';
	let typedSoFar: string = '';
	let index: number = 0;
	let timeInMinutes: number = 5;

	const setTypewriterMessage = () => {
		if (index < typewriterMessage.length) {
			typedSoFar += typewriterMessage.charAt(index);
			index++;
			setTimeout(setTypewriterMessage, TIMEOUT_LENGTH);
		}
	};

	const cleanUpTypewriter = () => {
		typedSoFar = '';
		index = 0;
	};

	onMount(() => {
		setTypewriterMessage();
		return cleanUpTypewriter;
	});

	const getHours = () => {
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

	$: timeLabel = timeInMinutes < 60 ? `${timeInMinutes} Minutes` : getHours();
</script>

<div class="flex h-screen flex-col gap-8 px-40 py-16 font-sawarabi text-raisin">
	<div class="flex flex-col gap-1">
		<h1 class="text-4xl font-bold">{typedSoFar}</h1>
		<h2 class="text-xl italic">
			An interactive web app to help you decide what to cook when you have no idea
		</h2>
	</div>

	<div>
		<div class="flex flex-col gap-5 text-lg">
			<StyledNumber index={1}>How much time do you have?</StyledNumber>
			<div class="flex flex-col gap-2">
				<label for="time" class="self-center">
					<div class="flex items-center justify-center gap-2">
						<img src={alarm} alt="clock" />
						<div>{timeLabel}</div>
					</div>
				</label>
				<input
					type="range"
					min="5"
					max="480"
					step="5"
					id="time"
					name="time"
					bind:value={timeInMinutes}
				/>
			</div>
		</div>
	</div>

	<!-- <div>
		<form>
			<ol class="list-decimal">
				<li>What type of meal are you trying to cook</li>
				<li>Any specific cuisine?</li>
				<li>What ingredients do you have?</li>
				<li>Any allergies?</li>
				<li>Caloric Value?</li>
				<li>How much time do you have?</li>
				<li>How many options do you want?</li>
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
