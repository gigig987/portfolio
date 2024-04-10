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
