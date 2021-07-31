import { Logger } from "@uniformdev/common";
import { ProcessingInstruction } from "..";
import { RenderingContext } from "..";
export interface MvcOptions {
    getProcessingInstructions: (processDefaultNode: any, placeholderComponent: any, r: any, index: number, placeholderKey: string, renderingContext: RenderingContext, logger: Logger) => ProcessingInstruction[];
}
//# sourceMappingURL=MvcOptions.d.ts.map