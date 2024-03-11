<script lang="ts">
	import type { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import { Image } from "@unpic/svelte";
    export let block: ImageBlockObjectResponse;
    export let aspectRatio: number | undefined
</script>

{#if block.image}
    <div class="image-container">
        {#if block.image.type=="file"}
            <Image src={block.image.file.url} layout="fullWidth" {aspectRatio} />
            {#if block.image.caption?.length > 0}
                <p>{block.image.caption?.[0].plain_text}</p>
            {/if}
        {:else if block.image.type=="external"}
            <Image src={block.image.external.url} layout="fullWidth" {aspectRatio} />
            {#if block.image.caption?.length > 0}
                <p>{block.image.caption?.[0].plain_text}</p>
            {/if}
        {/if}
    </div>
{/if}

