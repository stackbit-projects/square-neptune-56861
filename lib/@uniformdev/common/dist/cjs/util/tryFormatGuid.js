"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryFormatGuid = void 0;
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
function tryFormatGuid(value, format) {
    if (!value)
        return '';
    var lowerValue = value.toLowerCase();
    switch (format) {
        case 'N':
            return toFormatN(lowerValue);
        case 'D':
            return toFormatD(lowerValue);
        case 'B':
            return toFormatB(lowerValue);
        default:
            throw new Error('format arg: unknown guid format');
    }
}
exports.tryFormatGuid = tryFormatGuid;
function toFormatN(value) {
    var result = value.replace(/[{}-]/g, '');
    if (result.length !== 32) {
        return '';
    }
    return result;
}
function toFormatD(value) {
    if (value.length === 36 && value[8] === '-') {
        return value;
    }
    var fN = toFormatN(value);
    if (!fN)
        return '';
    return fN.substring(0, 8) + "-" + fN.substring(8, 12) + "-" + fN.substring(12, 16) + "-" + fN.substring(16, 20) + "-" + fN.substring(20, 32);
}
function toFormatB(value) {
    if (value.length === 38 && value[0] === '{' && value[9] === '-') {
        return value;
    }
    var fD = toFormatD(value);
    if (!fD)
        return '';
    return "{" + fD + "}";
}
//# sourceMappingURL=tryFormatGuid.js.map