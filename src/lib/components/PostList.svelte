<script lang="ts">
	import PostItem from "./PostItem.svelte";
	import type { PageData } from "../../routes/projects/$types";
	import type { Cover, Properties } from "$lib/types";

    export let data: PageData;
</script>

{#if data.pages}
    {#each data.pages as page}
        
        <PostItem properties = { page.properties } cover = { page.cover } />
    {/each}
{/if}


<style>

</style>