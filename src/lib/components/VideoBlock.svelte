<script lang="ts">
	import type { VideoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    export let block: VideoBlockObjectResponse;
</script>

<video autoplay loop muted>
    {#if block.video.type=="file"}
        <source src={block.video.file.url} type="video/mp4" />

    {:else if block.video.type=="external"}
        <source src={block.video.external.url} type="video/mp4" />
    {/if}
    <track kind="captions">
</video>