<script lang="ts">
	import toast from 'svelte-french-toast';
	import { blur, scale } from 'svelte/transition';

	let ingredients: string[] = [];
	let newIngredient: string = '';

	const addIngredient = () => {
		if (newIngredient.trim().length === 0) {
			console.log('too short');
			toast("Can't be empty", {
				position: 'bottom-right',
				duration: 1250,
				icon: '✋🏾'
			});
			return;
		}

		if (ingredients.indexOf(newIngredient.trim().toLocaleLowerCase()) !== -1) {
			toast('Ingredient already added', {
				position: 'bottom-right',
				duration: 1000,
				icon: '🙅🏾‍♂️'
			});
			return;
		}
		console.log(`Added ${newIngredient} to list`);
		ingredients = [...ingredients, newIngredient.trim().toLocaleLowerCase()];
		newIngredient = '';
		console.log(ingredients);
	};

	const removeIngredient = (ingredientIndex: number) => {
		ingredients = ingredients.filter((_, index) => index !== ingredientIndex);
	};
</script>

<div
	class="flex w-5/6 flex-col gap-4 rounded-lg border-2 border-raisin px-2 py-3 md:w-1/2 xl:w-5/12"
>
	{#if ingredients.length > 0}
		<div class="flex w-full flex-wrap gap-2">
			{#each ingredients as ingredient, index (ingredient)}
				<div
					class=" flex items-center justify-center gap-2 rounded-lg bg-stone-200 px-2 py-1"
					in:scale
					out:blur
				>
					<span>{ingredient}</span>
					<button
						class="flex h-6 w-6 items-center justify-center rounded-full bg-stone-500 text-snow"
						on:click={() => removeIngredient(index)}>&times;</button
					>
				</div>
			{/each}
		</div>
	{/if}

	<form on:submit|preventDefault={addIngredient} class="w-full">
		<input
			type="text"
			placeholder="Enter to submit"
			class="w-full border-none bg-transparent outline-none"
			bind:value={newIngredient}
		/>
	</form>
</div>
