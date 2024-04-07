import type { PageServerLoad } from './$types';
import {getHomeContent } from "$lib/notion";
import redis from '$lib/scripts/redis';

const fetchDataFromNotion = async () => {
  const response = await getHomeContent();
  return response;
};

export const load: PageServerLoad = async () => {
  try {
    const data = await redis.get('home-content');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.blocks) {
        console.log('cached home');
        return parsedData;
      }
    }

    console.log('NO cached home, fetching notion');
    const response = await fetchDataFromNotion();

    if (response && response.blocks && !('error' in response)
    ) {
      redis.setex('home-content', 3600 * 1, JSON.stringify(response));
    }

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
