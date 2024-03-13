import { Client, isFullUser } from "@notionhq/client";
import { getBlocks, getDatabaseById, getSkillsDatabaseById, getManifestoDatabaseById, getFAQs, getPageBySlug } from "./api";
import type { ServerLoadEvent } from "@sveltejs/kit";
// import BlogPost from "$lib/components/BlogPost.svelte";
// import PostsList from "$lib/components/PostsList.svelte";

type Tokens = { notionToken: string, projectsDatabaseId: string, skillsDatabaseId: string, manifestoDatabaseId: string, vercelByPassToken?: string };
export type BlogSettings = { blogTitle?: string, blogDescription?: string };
type InitConfig = { tokens: Tokens, settings: BlogSettings };
export type BlogClient = { client: Client, config: Tokens, settings: BlogSettings };

let notionCLient: BlogClient;

export const initNotionBlog = (config: InitConfig): BlogClient | null => {
    if (config?.tokens?.notionToken && config?.tokens?.notionToken) {
        const client = new Client({
            auth: config.tokens.notionToken,
        });
        notionCLient = { client, config: config.tokens, settings: config.settings };
        return notionCLient;
    } else {
        return null;
    }
}

export const getAllPosts = async () => {
    try {

        if (!notionCLient) {
            return {
                error: {
                    code: 400,
                    message: "Notion client is not initialized"
                }
            }
        }

        const res = await getDatabaseById(notionCLient);

        if (res.isOk()) {
            if (res.value?.length > 0) {
                const projects = {
                    pages: res.value,
                    settings: notionCLient.settings
                }
                return projects
            } else {
                return {
                    error: {
                        code: 400,
                        message: "Please add rows in the database"
                    }
                }
            }
        }

        if (res.isErr()) {
            return {
                error: {
                    code: res.error.code,
                    message: res.error.message
                }
            }
        }
    } catch (error) {
        return {
            error: {
                code: 500,
                message: "Some error ocurred"
            }
        }
    }
}

export const getAllSkills = async () => {
    try {

        if (!notionCLient) {
            return {
                error: {
                    code: 400,
                    message: "Notion client is not initialized"
                }
            }
        }

        const res = await getSkillsDatabaseById(notionCLient);

        if (res.isOk()) {
            if (res.value?.length > 0) {
                return {
                    skills: res.value,
                }
            } else {
                return {
                    error: {
                        code: 400,
                        message: "Please add rows in the database"
                    }
                }
            }
        }

        if (res.isErr()) {
            return {
                error: {
                    code: res.error.code,
                    message: res.error.message
                }
            }
        }
    } catch (error) {
        return {
            error: {
                code: 500,
                message: "Some error ocurred"
            }
        }
    }
}


export const getAllManifesto = async () => {
    try {

        if (!notionCLient) {
            return {
                error: {
                    code: 400,
                    message: "Notion client is not initialized"
                }
            }
        }

        const res = await getManifestoDatabaseById(notionCLient);

        if (res.isOk()) {
            if (res.value?.length > 0) {
                return {
                    manifesto: res.value,
                }
            } else {
                return {
                    error: {
                        code: 400,
                        message: "Please add rows in the database"
                    }
                }
            }
        }

        if (res.isErr()) {
            return {
                error: {
                    code: res.error.code,
                    message: res.error.message
                }
            }
        }
    } catch (error) {
        return {
            error: {
                code: 500,
                message: "Some error ocurred"
            }
        }
    }
}
export const getBlogPageBySlug = async (event: ServerLoadEvent) => {
    const { slug } = event.params;

    if (!notionCLient) {
        return {
            error: {
                code: 400,
                message: "Notion client is not initialized"
            }
        }
    }

    if (!slug) {
        return {
            error: {
                code: 400,
                message: "Invalid or missing blog slug"
            }
        }
    }

    const response = await getPageBySlug(notionCLient, slug);

    if (response.isOk() && response.value?.length > 0) {
        const page = response.value?.[0];
        const title = page.properties["Title"].type == "title" && page.properties["Title"]?.title?.[0]?.type == "text" ? page.properties["Title"]?.title?.[0]?.text?.content : undefined;
        const description = page.properties["Description"]?.type == "rich_text" ? page.properties["Description"]?.rich_text?.[0]?.plain_text : undefined;
        const cover = page?.cover?.type == "external" ? page?.cover?.external?.url : undefined;
        const published = page.properties["Publish Date"]?.type == "date" ? page.properties["Publish Date"].date?.start : undefined;

        if (!page?.id) {
            return {
                error: {
                    code: 500,
                    message: "Invalid or missing page!"
                }
            }
        }

        const blockResponse = await getBlocks(notionCLient, page.id);

        if (blockResponse.isOk()) {
            //console.log("result", JSON.stringify(blockResponse.value));
            const blocks = blockResponse.value;
            const faqsTableId = blocks?.filter((f) => f.type == "table")?.[0]?.id;
            let faqs = null;

            if (faqsTableId) {
                const faqsResponse = await getFAQs(notionCLient, faqsTableId);

                if (faqsResponse.isOk()) {
                    faqs = faqsResponse.value;
                }
            }

            return {
                blocks,
                title,
                description,
                cover,
                slug,
                published,
                faqs
            }
        }

        if (blockResponse.isErr()) {
            return {
                error: {
                    code: blockResponse.error.code,
                    message: blockResponse.error.message
                }
            }
        }
    } else {
        return {
            error: {
                code: 500,
                message: "Some error ocurred"
            }
        }
    }

    if (response.isErr()) {
        return {
            error: {
                code: response.error.code,
                message: response.error.message
            }
        }
    }
}

// export { BlogPost, PostsList }