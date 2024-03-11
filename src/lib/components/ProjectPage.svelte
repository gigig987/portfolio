<script lang="ts">
	import { JsonLd, MetaTags } from "svelte-meta-tags";
	// import ErrorPage from "./ErrorPage.svelte";
	import Project from "./Project.svelte";
	import type { TableOfContentItems } from "$lib/types";
	import type { PageData } from "../../routes/projects/[slug]/$types";

    export let data: PageData;

    let tableOfContent: (TableOfContentItems | undefined)[] | undefined;

    $: tableOfContent = data?.blocks?.map((block)=>{
        if(block.type==="heading_1"){
            return {
                type: block.type,
                text: block.heading_1?.rich_text?.map((t)=> t.plain_text)?.join(" "),
                id: block.id
            }
        }else if(block.type==="heading_2"){
            return {
                type: block.type,
                text: block.heading_2?.rich_text?.map((t)=> t.plain_text)?.join(" "),
                id: block.id
            }
        }else if(block.type==="heading_3"){
            return {
                type: block.type,
                text: block.heading_3?.rich_text?.map((t)=> t.plain_text)?.join(" "),
                id: block.id
            }
        }else{
            return undefined;
        }
    });
</script>

<MetaTags
  title= {data.title}
  titleTemplate="%s | Gianluca Gini - Product designer"
  description= {data.description}
  openGraph={{
    url: "https://gianlucagini.com/projects/" + data.slug,
    title:data.title,
    description: data.description,
    images: [
      { url: data.cover ?? "" }
    ],
    siteName: 'gianlucagini.com'
  }}
  twitter={{
    handle: '@mystorebud',
    site: '@mystorebud',
    cardType: 'summary_large_image',
    title: data.title,
    description: data.description,
    image: data.cover ,
    imageAlt: data.title
  }}
  facebook={{
    appId: '1234567890'
  }}
/>

<JsonLd 
    schema={{
        "@context": "https://schema.org", 
        "@type": "BlogPosting",
        "headline": data.title,
        "image": data.cover,
        "author": "Gianluca Gini", 
        "publisher": {
            "@type": "Organization",
            "name": "Gianluca Gini",
            "logo": {
            "@type": "ImageObject",
            "url": "https://pbs.twimg.com/profile_images/983481463910948864/ER92W0vU_400x400.jpg"
            }
        },
        "url": "http://www.gianlucagini.com",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://gianlucagini.com/projects"
        },
        "description": data.description,
        "articleBody": data.description,
        "dateCreated": data?.published ? new Date(data?.published).toISOString() : new Date().toISOString(),
        "datePublished": data?.published ? new Date(data.published).toISOString() : new Date().toISOString(),
    }}
/> 

<section>
    <Project blocks={data.blocks} title={data.title} />
</section>