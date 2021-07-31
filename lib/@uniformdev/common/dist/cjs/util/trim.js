"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimEnd = exports.trimStart = exports.trim = void 0;
function trim(str, char) {
    return str.slice(getSliceStartIndex(str, char), getSliceEndIndex(str, char));
}
exports.trim = trim;
function trimStart(str, char) {
    return str.slice(getSliceStartIndex(str, char));
}
exports.trimStart = trimStart;
function trimEnd(str, char) {
    return str.slice(0, getSliceEndIndex(str, char));
}
exports.trimEnd = trimEnd;
function getSliceStartIndex(str, char) {
    var startCharIndex = -1;
    while (str.charAt(++startCharIndex) === char)
        ;
    return startCharIndex;
}
function getSliceEndIndex(str, char) {
    var endCharIndex = str.length;
    while (str.charAt(--endCharIndex) === char)
        ;
    return endCharIndex + 1;
}
//# sourceMappingURL=trim.js.map