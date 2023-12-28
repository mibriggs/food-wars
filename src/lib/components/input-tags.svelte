<script lang="ts">
	import { ingredientsStore } from '$stores/stores';
	import toast from 'svelte-french-toast';
	import { blur, scale } from 'svelte/transition';

	let newIngredient: string = '';

	const showToast = (message: string, icon: string) => {
		toast(message, {
			duration: 1250,
			icon: icon,
			style:
				'--tw-border-opacity: 1; border-color: rgb(13 148 136 / var(--tw-border-opacity)); border-width: 2px;'
		});
	};

	const addIngredient = () => {
		if (newIngredient.trim().length === 0) {
			showToast("Can't be empty", '✋🏾');
			return;
		}

		if ($ingredientsStore.indexOf(newIngredient.trim().toLocaleLowerCase()) !== -1) {
			showToast('Ingredient already added', '🙅🏾‍♂️');
			return;
		}

		ingredientsStore.addItem(newIngredient.trim().toLocaleLowerCase());
		newIngredient = '';
	};

	const removeIngredient = (ingredientIndex: number) => {
		ingredientsStore.deleteItem($ingredientsStore[ingredientIndex]);
	};
</script>

<div class="flex w-5/6 flex-col gap-4 rounded-lg border-2 px-2 py-3 md:w-1/2 xl:w-5/12">
	<div class="flex w-full flex-wrap gap-2 empty:hidden">
		{#each $ingredientsStore as ingredient, index (ingredient)}
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

	<form on:submit|preventDefault={addIngredient} class="w-full">
		<input
			type="text"
			placeholder="Enter to submit"
			class="w-full border-none bg-transparent outline-none"
			bind:value={newIngredient}
		/>
	</form>
</div>
