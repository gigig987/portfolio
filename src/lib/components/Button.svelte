<script lang="ts">
	import type { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    export let block: CalloutBlockObjectResponse;
</script>

{#if block}
<a href={block.callout?.rich_text[0].href?.replace("https://", "/")}>
    <button>{block.callout.rich_text[0].plain_text}</button>
</a>
{/if}