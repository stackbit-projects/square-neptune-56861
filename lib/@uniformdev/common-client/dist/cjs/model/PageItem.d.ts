import { DataItem } from './DataItem';
import { RenderingNode } from './RenderingNode';
import { TrackingNode } from './TrackingNode';
import { PageMvcNode } from './PageMvcNode';
export interface PageItem extends DataItem {
    children?: DataItem[];
    renderings?: RenderingNode[];
    datasources?: any;
    tracking?: TrackingNode;
    url?: string;
    mvc?: PageMvcNode;
}
//# sourceMappingURL=PageItem.d.ts.map