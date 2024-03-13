<script lang="ts">
    import Text from "$lib/components/Text.svelte";
    import test from "node:test";
    import type { PageData } from "./$types";
    export let data: PageData;
    // Function to chunk the skills array into groups of 4
    const chunk = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

    // Your skills array
    let skills = data.skills;
    let manifesto = data.manifesto;


    // Chunk the skills array into groups of 4
    $: chunkedSkills = chunk(skills, 4);
</script>

<section class="hero">
    <h1>My name is Gianluca Gini, and I'm a product designer who ❤️ coding. I'm currently at Soldo. I also created Geenes.app.</h1>
    <aside>

        <a href="/projects"><button class="outline">Check my work</button></a>
    </aside>
</section>


<h2>Skills</h2>
{#each chunkedSkills as group}
    <div class="grid">
        {#each group as skill}
            <div>
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
            </div>
        {/each}
    </div>
{/each}

<h2>Manifesto</h2>
<section class="manifesto">
    {#each manifesto as entry}
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


<style>
.manifesto {
    grid-column-gap: calc(var(--pico-spacing) * 2);
    grid-row-gap: calc(var(--pico-spacing) * 2);
    display: grid;
    grid-template-columns: 1fr;
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
    .manifesto {
        grid-template-columns:1fr 1fr;
    }
}
@media(min-width: 768px) {
    .manifesto {
        grid-template-columns:1fr 1fr 1fr
    }
}
</style>