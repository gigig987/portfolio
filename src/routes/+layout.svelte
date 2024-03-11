<script lang="ts">
    import { PUBLIC_NOTION_DATABASE_ID, PUBLIC_NOTION_TOKEN } from "$env/static/public";
    import { initNotionBlog } from "$lib/notion";
	import { page } from '$app/stores';  

	import { onNavigate } from '$app/navigation';
	// import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '@picocss/pico/css/pico.red.css';
	import '../app.css';

	// view transition between routes
	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});



    export const prerender = true;
    initNotionBlog({
        tokens: {
            databaseId: PUBLIC_NOTION_DATABASE_ID, //from .env
            notionToken: PUBLIC_NOTION_TOKEN, //from .env
        },
        settings: {}
    });
</script>

<svelte:head>
	<title>Gianluca Gini - Product designer</title>
</svelte:head>

<header>
	<Navbar />
</header>

<main class="container-fluid">
	<slot />
</main>

<!-- <Footer /> -->