<script lang="ts">
	import FoodCard from '$components/food-card.svelte';
	import RestartIcon from '$images/restart.svg';
	import IosRightIcon from '$images/arrow_right_ios.svg';
	import ForwardArrowIcon from '$images/arrow_forward_ios.svg';
	import BackwardArrowIcon from '$images/arrow_back_ios.svg';

	const createRandomString = (): string => {
		return (Math.random() + 1).toString(36).substring(7);
	};
	const createRandomStringArray = (length: number): string[] => {
		const newArray: string[] = [];
		for (let i = 0; i < length; i++) {
			newArray.push(createRandomString());
		}
		return newArray;
	};
	const handleAdd = (indx: number): void => {
		nextArr = [...nextArr, currArr[indx]];
		selected_idx += 2;
	};
	const updateReferences = (): void => {
		currArr = [...nextArr];
		nextArr = [];
		selected_idx = 0;
		next_idx = selected_idx + 1;
	};
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

	let currArr: string[] = createRandomStringArray(10);
	let selected_idx: number = 0;
	let next_idx: number;
	let nextArr: string[] = [];
	let isLeftSelected: boolean = false;
	let isRightSelected: boolean = false;
	let isOnSecondCard: boolean = false;
	let screenWidth: number;
	const MAX_WIDTH: number = 1000;

	$: isNextButtonHidden = !isLeftSelected && !isRightSelected;
	$: next_idx = selected_idx + 1;
	$: if (selected_idx > currArr.length - 1) {
		updateReferences();
	}

	$: if (screenWidth < MAX_WIDTH) {
		setUpCards();
	}
</script>

<svelte:window bind:innerWidth={screenWidth} />
<div class="flex h-full flex-col items-center gap-8 font-sawarabi">
	<a href="/" class="self-start p-4">
		<img src={RestartIcon} alt="restart" />
	</a>

	<div class="flex flex-col items-center justify-center gap-1">
		<h1 class=" text-2xl font-bold md:text-3xl">What would you like to eat?</h1>
		<h2 class="text-xl italic">Please choose one</h2>
	</div>

	<!-- <div class="flex h-full flex-col items-center justify-center text-3xl">
		{#if next_idx < currArr.length}
			{currArr[selected_idx]} vs {currArr[next_idx]}
			<div class="flex gap-5">
				<button
					on:click={() => handleAdd(selected_idx)}
					class="w-fit rounded-2xl bg-teal-600 p-4 text-snow">Add {currArr[selected_idx]}</button
				>
				<button
					on:click={() => handleAdd(next_idx)}
					class="w-fit rounded-2xl bg-teal-600 p-4 text-snow">Add {currArr[next_idx]}</button
				>
			</div>
		{:else if currArr.length === 1}
			Winner
			{currArr[0]}
		{:else}
			{currArr[selected_idx]}
			<div class="flex gap-5">
				<button
					on:click={() => handleAdd(selected_idx)}
					class="w-fit rounded-2xl bg-teal-600 p-4 text-snow">Add {currArr[selected_idx]}</button
				>
				<button
					on:click={() => (selected_idx += 2)}
					class="w-fit rounded-2xl bg-teal-600 p-4 text-snow">Discard {currArr[selected_idx]}</button
				>
			</div>
		{/if}
	</div> -->
	{#if screenWidth > MAX_WIDTH}
		<div class="flex flex-row items-center gap-32">
			<FoodCard isSelected={isLeftSelected} on:cardClicked={() => handleSelection(false)} />
			<FoodCard isSelected={isRightSelected} on:cardClicked={() => handleSelection(true)} />
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center">
			<FoodCard
				isSelected={isLeftSelected}
				on:cardClicked={() => handleSelection(false)}
				isHidden={isOnSecondCard}
			/>
			<FoodCard
				isSelected={isRightSelected}
				on:cardClicked={() => handleSelection(true)}
				isHidden={!isOnSecondCard}
			/>
			<div class="flex items-center justify-center gap-2 py-5 font-sawarabi text-2xl">
				<button on:click={() => (isOnSecondCard = !isOnSecondCard)}>
					<img src={BackwardArrowIcon} alt="" />
				</button>
				{isOnSecondCard ? 2 : 1}/2
				<button on:click={() => (isOnSecondCard = !isOnSecondCard)}>
					<img src={ForwardArrowIcon} alt="" />
				</button>
			</div>
		</div>
	{/if}

	<!-- 
		We Want a button Here basically it should be hidden by default
		and once a dish has been it should be shown and say something like?
		Continue With {dishName} >
	-->
	<button
		class:conditionally-hidden={isNextButtonHidden}
		class="text-md m-4 self-end rounded-xl border-2 border-raisin bg-alabaster px-4 py-2 shadow-lg sm:text-xl"
	>
		<div class="flex items-center justify-center gap-2 text-raisin">
			<div>Continue With Bulgogi {isLeftSelected ? '1' : '2'}</div>
			<img src={IosRightIcon} alt="restart" />
		</div>
	</button>
</div>

<style lang="postcss">
	.conditionally-hidden {
		visibility: hidden;
	}
</style>
