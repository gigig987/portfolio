<script lang="ts">
	import type { BulletedListItemBlockObjectResponse, NumberedListItemBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
	import Text from "./Text.svelte";
    export let block: BulletedListItemBlockObjectResponse;
</script>

{#if block && block.bulleted_list_item?.rich_text.length > 0}
    {#each block.bulleted_list_item.rich_text as item }
    <li>
        <small>
            {item.plain_text}
        </small>
    </li>
    {/each}
{/if}