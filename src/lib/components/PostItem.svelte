<script lang="ts">
	import type { Cover, Properties } from "$lib/types";
    import { Image } from "@unpic/svelte";
    export let properties: Properties;
    export let cover: Cover | null;
</script>

<article>
    <div class="half">
        {#if properties.Type?.select?.name === 'Personal project'}
            <mark><small>Personal Project</small></mark>
        {/if}
        <hgroup>
            <h2>{properties.Title.rich_text?.[0]?.plain_text}</h2>
            <p>{properties.Description.rich_text?.[0]?.plain_text}</p>
        </hgroup>
        <a href={`/projects/${properties?.Slug?.rich_text?.[0]?.plain_text}`}><button class="">See more</button></a>
    </div>
    <div class="image half">
        <Image
        src= { (cover?.external?.url ?? cover?.file?.url ) ?? "https://picsum.photos/id/300/500?blur=9&random=2" }
        layout="fullWidth"
        alt={properties.CoverAlt?.rich_text?.[0]?.plain_text}
        background="auto"
        />
    </div>
</article>

<style>
    article {
        display: flex;
        align-items: center;
        box-shadow: none;
        background-color: transparent;
        flex-wrap: wrap;
    }
    article:nth-child(even) {
        flex-direction: row-reverse;

    }

    @media(min-width: 576px) {
    article:nth-child(even) .image {
        transform: translate(-10vw, 0vw);
    }
    article:nth-child(odd) .image {
        transform: translate(10vw, 0vw);
        z-index: -1;
    }
}
    article :is(.half) {
        flex: 1 1 320px;
    }
    article > * {
        margin-block-end: var(--pico-spacing);
    }
</style>