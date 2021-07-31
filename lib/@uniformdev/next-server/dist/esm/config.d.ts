import { ConfigOptions } from '.';
export declare function config(nextConfig: {
    publicRuntimeConfig: any;
} & ConfigOptions): {
    publicRuntimeConfig: any;
} & ConfigOptions & {
    exportTrailingSlash: boolean;
    publicRuntimeConfig: any;
    exportPathMap: () => Promise<any>;
};
//# sourceMappingURL=config.d.ts.map