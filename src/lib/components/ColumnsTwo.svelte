<script lang="ts">
    import type { BlockWithChildren } from "$lib/notion/api";
    import Block from "./Block.svelte";
    export let columns : BlockWithChildren[]
</script>

<div class="grid">
    {#each columns as column }
        <div>
            {#if column.has_children && column.children}
                {#each column.children as child }
                    <Block block={child} inColumn={true} />
                {/each}
            {/if}
        </div>
    {/each}
</div>

<style>
    .grid > div {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>