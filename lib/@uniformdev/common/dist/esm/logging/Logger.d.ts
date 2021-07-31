export interface Logger {
    trace?: (...message: any[]) => void;
    debug: (...message: any[]) => void;
    info: (...message: any[]) => void;
    warn: (...message: any[]) => void;
    error: (...message: any[]) => void;
}
export declare function getNullLogger(): Logger;
//# sourceMappingURL=Logger.d.ts.map