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
    skills?: undefined;
    manifesto?: undefined;
} | {
    skills: import("@notionhq/client/build/src/api-endpoints").PageObjectResponse[];
    manifesto: import("@notionhq/client/build/src/api-endpoints").PageObjectResponse[];
    error?: undefined;
} | undefined>;