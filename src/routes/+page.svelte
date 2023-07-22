<script lang="ts">
	import { onMount } from 'svelte';
    import alarm from '../lib/assets/alarm.svg'

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
        
        if (timeInMinutes === 60) {
            return '1 Hour';
        }
        else if (timeInMinutes % MINUTES_IN_HOUR == 0) {
            return `${hours} Hours`;
        }
        return `${hours} ${hours === 1? 'Hour' : 'Hours'}, ${minutes} minutes`;
    };

	$: timeLabel = timeInMinutes < 60 ? `${timeInMinutes} Minutes` : getHours();
</script>

<div class="flex h-screen flex-col gap-8 p-16 font-sawarabi text-raisin">
	<div class="flex flex-col gap-1">
		<h1 class="text-3xl font-bold">{typedSoFar}</h1>
		<h2 class="text-xl italic">
			An interactive web app to help you decide what to cook when you have no idea
		</h2>
	</div>

	<div>
        <div class="flex flex-col text-lg gap-5">
            <div>1. How much time do you have?</div>
            <div class="flex flex-col gap-0.5">
                <label for="time" class="self-center">
                    <div class="flex gap-2 justify-center items-center">
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
