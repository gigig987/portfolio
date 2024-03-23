import type { ServerLoadEvent } from '@sveltejs/kit';
import { getBlogPageBySlug } from '$lib/notion';
// import redis from '$lib/scripts/redis';

export const load = async (event: ServerLoadEvent) => {
    console.log('NO cached page, fetching notion')
    const page = await getBlogPageBySlug(event);;
    return page
   
}