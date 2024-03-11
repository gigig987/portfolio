<script lang="ts">
    import type { PageData } from './$types';
    import PostsList from "$lib/components/PostList.svelte";
    export let data: PageData;
</script>

<div>
    <PostsList {data} />
</div>