/**
 * Examples:
 * {
 *   prop1: {
 *     prop2: {
 *       prop3: 'deep',
 *       prop4: [
 *         { prop5: 'deeper' }
 *       ]
 *     }
 *   }
 * }
 * 'prop1.prop2.prop3' == 'deep'
 * 'prop1.prop2.prop4.0.prop5' == 'deeper'
 */
export declare function getNestedObjectProp(obj: any, propPath: string, defaultValue: any): any;
//# sourceMappingURL=getNestedObjectProp.d.ts.map