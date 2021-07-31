// https://stackoverflow.com/a/1144788/9324
export function replace(value, searchValue, replaceValue) {
    var escapedSearchValue = searchValue.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    var replacedValue = value.replace(new RegExp(escapedSearchValue, 'g'), replaceValue);
    return replacedValue;
}
//# sourceMappingURL=replace.js.map