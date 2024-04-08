import type { PageServerLoad } from './$types';
import {getHomeContent } from "$lib/notion";
import redis from '$lib/scripts/redis';

const fetchDataFromNotion = async () => {
  const response = await getHomeContent();
  return response;
};

export const load: PageServerLoad = async () => {
  try {

    console.log('NO cached home, fetching notion');
    const response = await fetchDataFromNotion();

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
