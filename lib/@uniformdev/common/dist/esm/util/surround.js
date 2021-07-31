export function surround(obj, arg) {
    return !obj ? arg : (obj.startsWith(arg) ? '' : arg) + obj + (obj.endsWith(arg) ? '' : arg);
}
//# sourceMappingURL=surround.js.map