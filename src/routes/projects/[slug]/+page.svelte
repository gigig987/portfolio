<script lang="ts">
    import ProjectPage from '$lib/components/ProjectPage.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<ProjectPage {data} />