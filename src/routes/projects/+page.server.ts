import type { PageServerLoad } from './$types';
import { getAllPosts } from "$lib/notion";
// import redis from '$lib/scripts/redis';

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
export const load: PageServerLoad = async () => {
    console.log('NO cached projects, fetching notion')
    const projects: SuccessResponse | ErrorResponse | undefined = await getAllPosts();
    return projects
}
