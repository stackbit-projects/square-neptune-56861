import { Logger, UniformConfig } from '@uniformdev/common';
import { DataItem, PageItem } from '..';
export declare function getPageItem(path: string, logger: Logger, config: UniformConfig): Promise<PageItem>;
export declare function getDataItem(path: string, type: string, logger: Logger, config: UniformConfig): Promise<DataItem>;
export declare function getDatasources(page: PageItem): Promise<any>;
export declare function getHtml(page: PageItem): Promise<any>;
export interface PageProps {
    item?: PageItem;
    page?: PageItem;
    home?: DataItem;
    datasources: any;
    html: any;
    path?: string;
}
export declare function getPageProps(asPath: string, config: UniformConfig, logger?: Logger): Promise<PageProps>;
//# sourceMappingURL=getPageProps.d.ts.map