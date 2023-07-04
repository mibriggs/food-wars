<script lang="ts">
	import FoodCard from '../../lib/components/food-card.svelte';

	const createRandomString = () => {
		return (Math.random() + 1).toString(36).substring(7);
	};
	const createRandomStringArray = (length: number) => {
		const newArray: string[] = [];
		for (let i = 0; i < 10; i++) {
			newArray.push(createRandomString());
		}
		return newArray;
	};
	const handleAdd = (indx: number) => {
		nextArr = [...nextArr, currArr[indx]];
		selected_idx += 2;
	};
	const updateReferences = () => {
		currArr = [...nextArr];
		nextArr = [];
		selected_idx = 0;
		next_idx = selected_idx + 1;
	};

	let currArr: string[] = createRandomStringArray(10);
	let selected_idx = 0;
	let next_idx: number;
	let nextArr: string[] = [];

	$: next_idx = selected_idx + 1;
	$: console.log('Current Array', currArr);
	$: console.log('Next Array', nextArr);
	$: if (selected_idx > currArr.length - 1) {
		updateReferences();
		console.log('Current Array', currArr);
		console.log('Next Array', nextArr);
	}
</script>

<!-- <div class="flex items-center justify-center">
	Select the meal you'd prefer to Cook
</div> -->
<div class="flex h-full flex-col items-center justify-center text-3xl">
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
</div>


<div class="flex h-screen flex-row items-center justify-evenly">
	<FoodCard on:focus={() => console.log('focused')} />
	<FoodCard />
</div>
<button class="w-fit rounded-2xl bg-teal-600 p-4 text-2xl text-snow">
	<a href="/">Reset</a>
</button>
