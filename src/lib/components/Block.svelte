<script lang="ts">
	import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import type { BlockWithChildren } from '$lib/notion/api'
	import Heading from "./Heading.svelte";
	import Paragraph from "./Paragraph.svelte";
    import ColumnsTwo from "./ColumnsTwo.svelte";
	import ImageBlock from "./ImageBlock.svelte";
	// import NumberedList from "./NumberedList.svelte";
	import BulletList from "./BulletList.svelte";
    import BigText from "./BigText.svelte";
    import VideoBlock from "./VideoBlock.svelte";
    import Divider from "./Divider.svelte";
    import Button from "./Button.svelte";
	// import Embed from "./Embed.svelte";
    export let block: BlockWithChildren;
    export let inColumn = false
    // $: console.log("type",block.type, block);
</script>


{#if block.type=="heading_1"}
    <Heading heading={block} />
{:else if block.type=="heading_2"}
    <Heading heading={block} />
{:else if block.type=="heading_3"}
    <Heading heading={block} />
{:else if block.type=="paragraph"}
    <Paragraph paragraph={block} />
{:else if block.type=="column_list" && block.children}
    <ColumnsTwo columns={block.children} />
{:else if block.type=="bulleted_list_item"}
    <BulletList {block} />
{:else if block.type=="quote"}
    <BigText text={block} />
{:else if block.type=="image"}
    <ImageBlock {block} aspectRatio={inColumn ? undefined : 16/9}/>
{:else if block.type=="video"}
    <VideoBlock {block} />
{:else if block.type=="divider"}
    <Divider />
{:else if block.type=="callout"}
    <Button {block} />
<!-- {:else if block.type=="numbered_list_item"}
    <NumberedList {block} />
{:else if block.type=="embed"}
    <Embed {block} /> -->
{/if}

