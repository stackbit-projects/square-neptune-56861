import { RenderingContext } from ".";
export declare enum RenderingType {
    mvc = "MvcRendering",
    javascript = "JavaScriptRendering"
}
export interface RenderingNode {
    id?: string;
    renderingId?: string;
    renderingType: RenderingType;
    componentName?: string;
    placeholder?: string;
    datasource: string;
    hidden: boolean;
    settings: any;
    renderingContext: RenderingContext;
}
//# sourceMappingURL=RenderingNode.d.ts.map