<script>
	import { Toaster } from 'svelte-french-toast';
	import '../app.css';
</script>

<Toaster />
<slot />

<!-- 
    Start using Tailwind’s utility classes to style your content, 
    making sure to set lang="postcss" for any <style> blocks that 
    need to be processed by Tailwind. 
-->

<style lang="postcss">
	:global(body) {
		background-color: #fcf7f8;
	}
</style>
