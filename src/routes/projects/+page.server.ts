import type { PageServerLoad } from './$types';
import { getAllPosts } from "$lib/notion";
export const load: PageServerLoad = () => getAllPosts();