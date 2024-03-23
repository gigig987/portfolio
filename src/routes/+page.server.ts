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
export const load: PageServerLoad = async () => {
    try {
        const data = await redis.get('home')
        if (data) {
            console.log('cached home')
            return JSON.parse(data);
        } else {
            console.log('NO cached home, fetching notion')
            const skills = await getAllSkills();
            const manifesto = await getAllManifesto();
            const response = {...skills, ...manifesto}
            if (
                (skills && !('error' in skills))
                &&
                (manifesto && !('error' in manifesto))

                ) {
                redis.setex('home', 3600 * 1, JSON.stringify(response));
            }
            return response
        }
    } catch (error) {
        return {
            error
        }
    }
}
