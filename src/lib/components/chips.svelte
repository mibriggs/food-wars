<script lang="ts">
    const cuisines = ["american", "italian", "japanese", "nigerian", "indian", "chinese"]
</script>

<div class="flex flex-wrap w-5/12 gap-2">
    {#each cuisines as cuisine}
        <button class=" border-2 px-3 rounded-full p-1">{cuisine}</button>
    {/each}
</div>