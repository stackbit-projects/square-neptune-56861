"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
// https://stackoverflow.com/a/1144788/9324
function replace(value, searchValue, replaceValue) {
    var escapedSearchValue = searchValue.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    var replacedValue = value.replace(new RegExp(escapedSearchValue, 'g'), replaceValue);
    return replacedValue;
}
exports.replace = replace;
//# sourceMappingURL=replace.js.map