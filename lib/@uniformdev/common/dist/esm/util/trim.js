export function trim(str, char) {
    return str.slice(getSliceStartIndex(str, char), getSliceEndIndex(str, char));
}
export function trimStart(str, char) {
    return str.slice(getSliceStartIndex(str, char));
}
export function trimEnd(str, char) {
    return str.slice(0, getSliceEndIndex(str, char));
}
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