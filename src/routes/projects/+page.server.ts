import type { PageServerLoad } from './$types';
import { getAllPosts } from "$lib/notion";
import redis from '$lib/scripts/redis';

import type { BlogSettings } from '$lib/notion';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

type SuccessResponse = {
  pages: PageObjectResponse[];
  settings: BlogSettings;
};

type ErrorResponse = {
  error: {
    code: number;
    message: string;
  };
};

const fetchDataFromNotion = async () => {
  const projects: SuccessResponse | ErrorResponse | undefined = await getAllPosts();
  return projects;
};

export const load: PageServerLoad = async () => {
  try {
    const data = await redis.get('projects');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.pages) {
        console.log('cached projects');
        return parsedData;
      }
    }

    console.log('NO cached projects, fetching notion');
    const response = await fetchDataFromNotion();

    if (response && !('error' in response)) {
      redis.setex('projects', 3600 * 1, JSON.stringify(response));
    }

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
