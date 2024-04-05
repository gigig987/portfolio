<script lang="ts">
    import Text from "$lib/components/Text.svelte";
    import type { PageData } from "./$types";
    import Block from "$lib/components/Block.svelte";
    export let data: PageData;

    console.log(data)
</script>

{#each data.blocks as block}
    {#if block.type == 'child_database' && block.child_database.title.includes('Skills')}
    <h2>Skills</h2>
    <section class="skills">

            {#each data.skills as skill}
                    <article>
                        <header>
                            {skill.properties?.Name?.title[0]?.plain_text}
                        </header>
                        <main>
                            <span class="big-text">
                                {skill.properties?.Value?.number}
                            </span>
                            <progress
                                value={skill.properties?.Value?.number}
                                max="100"
                            />
                        </main>
                    </article>
            {/each}
        </section>
        {:else if block.type == 'child_database' && block.child_database.title.includes('Manifest')}
        <h2>Manifesto</h2>
        <section class="manifesto">
            {#each data.manifesto as entry}
            <article class="manifesto-entry">
                <header class={`pico-color-${entry.properties?.Type?.select?.name.toLowerCase()}`}>
                    <span class="medium-text">
                        {entry.properties?.Name?.title[0]?.plain_text}
                    </span>
                </header>
                <main>
                    <Text text={entry.properties?.Description?.rich_text[0]} />
                </main>
            </article>
            {/each}
        </section>
        {:else}
        <Block {block} />
    {/if}


{/each}


<style>

.manifesto, .skills {
    grid-column-gap: calc(var(--pico-spacing) * 2);
    grid-row-gap: calc(var(--pico-spacing) * 2);
    display: grid;
    grid-template-columns: 1fr;
}
.skills > article {
    border: 1px solid;
}
.manifesto .manifesto-entry {
    margin: 0;
    margin-bottom: 0.75rem;
    padding-block-start: 0;
    padding-block-end: calc(var(--pico-spacing) * 0.75);
    padding-inline: calc(var(--pico-spacing) * 1);
    border: 1px solid;
    border-radius: var(--pico-border-radius);
    text-align: left;
}
.manifesto .manifesto-entry header {
    margin-block: 0;
    padding-block: calc(var(--pico-spacing) * 0.5);
    border-block-end: 4px solid;
}

.manifesto .manifesto-entry header > *{
    color: var(--pico-h2-color);
}
@media(min-width: 576px) {
    .manifesto, .skills {
        grid-template-columns:1fr 1fr;
    }
    
}
@media(min-width: 768px) {
    .manifesto {
        grid-template-columns:1fr 1fr 1fr
    }
    .skills {
        grid-template-columns:1fr 1fr 1fr 1fr
    }
}
</style>