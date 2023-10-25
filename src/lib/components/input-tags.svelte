<script lang="ts">
    let ingredients: string[] = [];
    let newIngredient: string = '';

    const addIngredient = () => {
        console.log(`Added ${newIngredient} to list`);
        ingredients = [...ingredients, newIngredient];
        newIngredient = '';
        console.log(ingredients);
    };

    const removeIngredient = (ingredientIndex: number) => {
        ingredients = ingredients.filter((_, index) => index !== ingredientIndex);
    };
</script>

<div class="flex flex-col w-5/6 md:w-1/2 gap-4 border-raisin border-2 p-2 rounded-lg">
    {#if ingredients.length > 0} 
    <div class="flex gap-2 w-full flex-wrap">
        {#each ingredients as ingredient, index}
            <div class=" rounded-lg bg-stone-200 p-2 flex items-center justify-center gap-2">
                <span>{ingredient}</span>
                <button on:click={() => removeIngredient(index)}>&times;</button>
            </div>
        {/each}
    </div>
    {/if}

    <form on:submit|preventDefault={addIngredient} class="w-full">
        <input type="text" placeholder="Enter to submit" class="w-full bg-transparent border-none outline-none" bind:value={newIngredient}/>
    </form>
</div>