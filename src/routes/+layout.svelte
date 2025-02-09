<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import '../app.css';
	import { onMount } from 'svelte';

	const detectServiceWorkerUpdate = async () => {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newServiceWorker = registration.installing;

			newServiceWorker?.addEventListener('statechange', () => {
				if (newServiceWorker.state === 'installing') {
					if (confirm("A new version is available! Please reload to update")) {
						newServiceWorker.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}

	onMount(() => { detectServiceWorkerUpdate() })
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
