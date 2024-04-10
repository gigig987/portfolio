    import { PUBLIC_NOTION_MANIFESTO_DB_ID, PUBLIC_NOTION_PROJECTS_DB_ID, PUBLIC_NOTION_SKILLS_DB_ID, PUBLIC_NOTION_TOKEN, PUBLIC_NOTION_HOME_ID } from "$env/static/public";
    import { initNotionBlog } from "$lib/notion";
	

    initNotionBlog({
		//from .env
        tokens: {
            projectsDatabaseId:  PUBLIC_NOTION_PROJECTS_DB_ID, 
			skillsDatabaseId: PUBLIC_NOTION_SKILLS_DB_ID,
			manifestoDatabaseId: PUBLIC_NOTION_MANIFESTO_DB_ID,
            notionToken: PUBLIC_NOTION_TOKEN,
			homePageId: PUBLIC_NOTION_HOME_ID
        },
        settings: {}
    });

    export const config = {
        isr: {
          // Expiration time (in seconds) before the cached asset
          // will be regenerated by invoking the Serverless Function.
          // Setting the value to `false` means it will never expire.
          expiration: false,
      }
    }