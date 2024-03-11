<script lang="ts">
	import type { BlockObjectResponse, UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Block from "./Block.svelte";

    export let blocks: BlockObjectResponse[] | undefined;
    export let title: string | undefined;

</script>

{#if blocks && blocks.length >0}
    <article>
        {#if title}
            <h1>{title}</h1>
        {/if}

        {#each blocks as block}
            <Block {block} />
        {/each}

    </article>
{/if}