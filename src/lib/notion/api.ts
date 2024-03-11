import type { BlogClient } from "$lib/notion";
import type { FAQ } from "$lib/types";
import { APIErrorCode, isNotionClientError, ClientErrorCode, isFullPage, isFullBlock } from "@notionhq/client";
import type { BlockObjectResponse, PageObjectResponse, UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ok, err, Result } from 'neverthrow';

type ErrorResult = { code: number, message: string };
export type BlockWithChildren = BlockObjectResponse & {
    children?: BlockWithChildren[]
}
export const getDatabaseById = async (blogClient: BlogClient): Promise<Result<(PageObjectResponse)[], ErrorResult>> => {
    try {
        const notion = blogClient.client;

        if(!notion){
            return err({code: 400, message: "Invalid or missing notion secret"});
        }
        
        const database = await notion.databases.query({
            database_id: blogClient.config.databaseId,
            filter: {
                property: "Published",
                checkbox: {
                    "equals": true
                }
            },
            sorts: [
                {
                  property: "Publish Date",
                  direction: "descending"
                  }
            ],
        });

        const results = database.results;
        
        if(isPageObjectResponse(results) && results?.length > 0){
            const result : PageObjectResponse[] = results;
            return ok(result);
        }else{
            return ok([]);
        }
    } catch (error) {
        return handleNotionError(error);
    }
}

export const getPageBySlug = async (blogClient: BlogClient, slug: string): Promise<Result<PageObjectResponse[], ErrorResult>> =>{
    try {
        const notion = blogClient.client;

        if(!notion){
            return err({code: 400, message: "Invalid or missing notion secret"});
        }

        const res = await notion.databases.query({
            database_id: blogClient.config.databaseId,

            filter: {
                property: "Slug",
                rich_text: {
                    equals: slug
                }
            }
        });

        let pages: PageObjectResponse[] = [];

        if(res){
            for (const page of res.results) {
                if (!isFullPage(page)) {
                  continue;
                }
                
                pages.push(page);
              }

              return ok(pages);
        }else{
            return err({ code: 500, message: "Some error ocurred"});
        }
    
    } catch (error) {
        return handleNotionError(error);
    }
}

export const getBlocks = async (blogClient: BlogClient, blockId: string): Promise<Result<BlockObjectResponse[], ErrorResult>> => {
    const notion = blogClient.client;

    if (!notion) {
        return err({ code: 400, message: "Invalid or missing notion secret" });
    }

    async function getBlocksWithChildren(blockId: string): Promise<BlockWithChildren[]> {
        const { results } = await notion.blocks.children.list({
            block_id: blockId,
            page_size: 100,
        });
    
        let blocks: BlockWithChildren[] = [];
    
        if (results && results.length > 0) {
            // Map each block to a promise that resolves to its children
            const childrenPromises = results.map(block => {
                if (!isFullBlock(block)) return null;
                return block.has_children ? getBlocksWithChildren(block.id) : Promise.resolve([]);
            });
    
            // Resolve all promises in parallel
            const childrenBlocks = await Promise.all(childrenPromises);
    
            // Combine parent blocks with their children
            results.forEach((block, index) => {
                if (!isFullBlock(block)) return;
                const children = childrenBlocks[index];
                if (children) {
                    (block as BlockWithChildren).children = children;
                }
                blocks.push(block);
            });
        }
    
        return blocks;
    }
    

    try {
        const blocks = await getBlocksWithChildren(blockId);
        return ok(blocks);
    } catch (error) {
        return err({ code: 500, message: "Unknown Error" });
    }
}


const handleNotionError = (error: unknown) => {
    if (isNotionClientError(error)) {
        // error is now strongly typed to NotionClientError
        switch (error.code) {
          case ClientErrorCode.RequestTimeout:
            return err({code: 400, message: "Request could not be completed"});
          case APIErrorCode.ObjectNotFound:
            return err({code: 500, message: "Database of page not found"});
          case APIErrorCode.Unauthorized:
            return err({code: 401, message: "User not authorized"})
          default:
            return err({code: 500, message: "Some error ocurred"})
        }
      }else{
        return err({code: 400, message: error ? Object.keys(error)?.length > 0 ?  "": "" : "Some error ocurred"});
      }
}

function isPageObjectResponse(response: any) : response is PageObjectResponse[] {
    return (response as PageObjectResponse[])?.[0]?.properties!==null && (response as PageObjectResponse[])?.[0]?.properties!==undefined;
}

export const getNotionUser = async (blogClient: BlogClient, userId: string): Promise<Result<UserObjectResponse, ErrorResult>> => {
    try {
        const notion = blogClient.client;

        if(!notion){
            return err({code: 400, message: "Invalid or missing notion secret"});
        }

        const response = await notion.users.retrieve({user_id: userId});
        if(response){
            return ok(response)
        }else{
            return err({code: 500, message: "Some error ocurred"});
        }
    } catch (error) {
        return handleNotionError(error);
    }
}

export const getFAQs = async (blogClent: BlogClient, id: string): Promise<Result<FAQ[], ErrorResult>> => {
    const response = await getBlocks(blogClent, id);

    if(response.isOk()){
        const faqs: FAQ[] = response.value.map((row)=>{
            if(row.type=="table_row"){
                return {
                    question: row.table_row.cells?.[0]?.[0]?.plain_text,
                    answer: row.table_row.cells?.[1]?.map((r)=> r.plain_text)?.join("")
                }
            }else{
                return {
                    question: null,
                    answer: null
                }
            }
        });

        return ok(faqs);
    }else if(response.isErr()){
        return err(response.error);
    }else{
        return err({
             code: 500, message: "Unknown Error"
        });
    }
}