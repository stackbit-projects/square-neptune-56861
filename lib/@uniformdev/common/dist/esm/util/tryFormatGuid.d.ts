declare type GuidFormat = 'N' | 'D' | 'B';
/**
 * Format N
 * 32 digits
 * 00000000000000000000000000000000
 *
 * Format D
 * 32 digits separated by hyphens
 * 00000000-0000-0000-0000-000000000000
 *
 * Format B
 * 32 digits separated by hyphens, enclosed in braces
 * {00000000-0000-0000-0000-000000000000}
 * */
export declare function tryFormatGuid(value: string | undefined, format: GuidFormat): string;
export {};
//# sourceMappingURL=tryFormatGuid.d.ts.map