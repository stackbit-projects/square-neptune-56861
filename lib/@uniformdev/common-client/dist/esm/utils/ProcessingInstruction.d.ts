export interface ProcessingInstruction {
    replaceChildren?: boolean;
    shouldProcessNode: ShouldProcessNodeFunction;
    processNode: ProcessNodeFunction;
}
interface ShouldProcessNodeFunction {
    (node: any): boolean;
}
interface ProcessNodeFunction {
    (node: any, children: any, index: number): any;
}
export {};
//# sourceMappingURL=ProcessingInstruction.d.ts.map