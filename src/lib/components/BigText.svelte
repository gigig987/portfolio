<script lang="ts">
	import type { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    export let text: QuoteBlockObjectResponse;
</script>

{#if text}
    <p>
        {text.quote?.rich_text[0]?.plain_text}
    </p>
    <!-- <p style:font-weight={text.annotations.bold ? "bold": "normal"} style:font-style={text.annotations.italic ? "italic": "normal"}>{text.plain_text}</p> -->
{/if}

<style>
    p {
        --pico-font-size: 1.75rem;
        --pico-line-height: 1.15;
        --pico-typography-spacing-top: 2.625rem;
        font-size: var(--pico-font-size);
        margin-block: var(--pico-typography-spacing-top)
    }
</style>