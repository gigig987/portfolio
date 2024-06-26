import type { ServerLoadEvent } from '@sveltejs/kit';
import { getBlogPageBySlug } from '$lib/notion';
import redis from '$lib/scripts/redis';

const fetchDataFromNotion = async (event: ServerLoadEvent) => {
  const page = await getBlogPageBySlug(event);
  return page;
};

export const load = async (event: ServerLoadEvent) => {
  try {
    const { slug } = event.params;
    const data = await redis.get(slug!);
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.blocks) {
        console.log('cached project page');
        return parsedData;
      }
    }

    console.log('NO cached page, fetching notion');
    const response = await fetchDataFromNotion(event);

    if (response && !('error' in response)) {
      redis.setex(slug!, 3600, JSON.stringify(response));
    }

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};

