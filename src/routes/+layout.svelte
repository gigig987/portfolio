<script lang="ts">
    import { PUBLIC_NOTION_MANIFESTO_DB_ID, PUBLIC_NOTION_PROJECTS_DB_ID, PUBLIC_NOTION_SKILLS_DB_ID, PUBLIC_NOTION_TOKEN, PUBLIC_NOTION_HOME_ID } from "$env/static/public";
    import { initNotionBlog } from "$lib/notion";
	
	import { onNavigate } from '$app/navigation';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from "$lib/components/Footer.svelte";
	import '@picocss/pico/css/pico.red.css';
	import '@picocss/pico/css/pico.colors.min.css';

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
		//from .env
        tokens: {
            projectsDatabaseId:  PUBLIC_NOTION_PROJECTS_DB_ID, 
			skillsDatabaseId: PUBLIC_NOTION_SKILLS_DB_ID,
			manifestoDatabaseId: PUBLIC_NOTION_MANIFESTO_DB_ID,
            notionToken: PUBLIC_NOTION_TOKEN,
			homePageId: PUBLIC_NOTION_HOME_ID
        },
        settings: {}
    });
</script>

<svelte:head>
	<title>Gianluca Gini - Lead Product designer</title>
	<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
	<script>hljs.highlightAll();</script> -->
</svelte:head>

<header>
	<Navbar />
</header>

<main class="container-fluid">
	<slot />
</main>

<footer>
	<nav class="container-fluid big-text">
		<ul>
			<li>
				<a href="/gianluca_gini_resume.pdf" target="_blank">
					Résumé
				</a>
			</li>
			<li>|</li>
			<li>
				<a href="mailto:gigig987@gmail.com">Say hi</a>
			</li>
		</ul>
		<ul>
			<li>
				<a href="#top"> scroll to top </a>
			</li>
		</ul>
	</nav>
	<Footer />
</footer>

<style>
	main {
		overflow-x: hidden;
	}
	footer {
		padding-block-start: calc(var(--pico-spacing) * 3);
		padding-block-end: calc(var(--pico-spacing) * 2);
	}

	footer nav {
	}
	
	@media(max-width: 576px) {
		footer nav {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>