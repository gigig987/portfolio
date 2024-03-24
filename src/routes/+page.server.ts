import type { PageServerLoad } from './$types';
import { getAllSkills, getAllManifesto } from "$lib/notion";
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
  const skills = await getAllSkills();
  const manifesto = await getAllManifesto();
  const response = { ...skills, ...manifesto };
  return response;
};

export const load: PageServerLoad = async () => {
  try {
    const data = await redis.get('home');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.skills && parsedData.manifesto) {
        console.log('cached home');
        return parsedData;
      }
    }

    console.log('NO cached home, fetching notion');
    const response = await fetchDataFromNotion();

    if (
      (response.skills && !('error' in response.skills)) &&
      (response.manifesto && !('error' in response.manifesto))
    ) {
      redis.setex('home', 3600 * 72, JSON.stringify(response));
    }

    return response;
  } catch (error) {
    return {
      error,
    };
  }
};
