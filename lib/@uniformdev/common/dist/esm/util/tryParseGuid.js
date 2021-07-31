var regex = /^([0-9A-F]{32})|[\{\[\(]?([0-9A-F]{8})\-([0-9A-F]{4})\-([0-9A-F]{4})\-([0-9A-F]{4})\-([0-9A-F]{12})[\]\}\)]?$/i;
export function tryParseGuid(value) {
    var result = regex.exec(value || '');
    if (!result) {
        return '';
    }
    return result.reduce(function (prev, value, index) { return prev + (index > 0 && value ? value : ''); }, '').toLowerCase();
}
//# sourceMappingURL=tryParseGuid.js.map