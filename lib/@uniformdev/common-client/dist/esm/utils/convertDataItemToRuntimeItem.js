var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export function convertDataItemToRuntimeItem(dataItem, name, url) {
    if (!dataItem) {
        return null;
    }
    var item = __assign(__assign({}, dataItem), { name: name || dataItem.name, children: [] });
    if (url || dataItem.url) {
        item.url = url || dataItem.url;
    }
    var childrenMap = dataItem.children;
    for (var childName in childrenMap) {
        if (!childrenMap.hasOwnProperty(childName))
            continue;
        var child = childrenMap[childName];
        var childUrl = !url
            ? undefined
            : url + (url.endsWith('/') ? '' : '/') + childName + (url.endsWith('/') ? '' : '/');
        item.children.push(convertDataItemToRuntimeItem(child, childName, childUrl));
    }
    return item;
}
//# sourceMappingURL=convertDataItemToRuntimeItem.js.map