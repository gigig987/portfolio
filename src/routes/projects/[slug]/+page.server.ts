import type { ServerLoadEvent } from '@sveltejs/kit';
import { getBlogPageBySlug } from '$lib/notion';

export const load = (event: ServerLoadEvent) => getBlogPageBySlug(event);