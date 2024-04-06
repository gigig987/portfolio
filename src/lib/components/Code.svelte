<script lang="ts">
	import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
    import Prism from "prismjs";
    import '$lib/prismjs/prism.css'    
    export let block: CodeBlockObjectResponse;

    let language = block.code.language
    let code = block.code.rich_text[0].plain_text

    $: highlightedCode = Prism.highlight(code, Prism.languages[language], language)
</script>

<pre><code class={`language-${language}`}>{@html highlightedCode}</code></pre>

<style>
    pre {
        --pico-code-background-color: var(--pico-color-slate-800)
    }
</style>