import type { ServerLoadEvent } from '@sveltejs/kit';
import { getBlogPageBySlug } from '$lib/notion';
import redis from '$lib/scripts/redis';

export const load = async (event: ServerLoadEvent) => {
    try {
        const { slug } = event.params;
        const data = await redis.get(slug!)
        if (data) {
            console.log('cached project page')
            return JSON.parse(data);
        } else {
            console.log('NO cached page, fetching notion')
            const page = await getBlogPageBySlug(event);;
            if (page && !('error' in page)) {
                redis.setex(slug!, 3600, JSON.stringify(page));
            }
            return page
        }
    } catch (error) {
        return {
            error
        }
    }
   
}