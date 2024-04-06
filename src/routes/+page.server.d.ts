export declare const config: {
    isr: {
        expiration: boolean;
        bypassToken: undefined;
    };
};
export declare const load: () => Promise<{
    error: {
        code: number;
        message: string;
    };
    blocks? : undefined;
    skills?: undefined;
    manifesto?: undefined;
} | {
    blocks: import("@notionhq/client/build/src/api-endpoints").BlockObjectResponse[];
    skills: import("@notionhq/client/build/src/api-endpoints").PageObjectResponse[];
    manifesto: import("@notionhq/client/build/src/api-endpoints").PageObjectResponse[];
    error?: undefined;
} | undefined>;