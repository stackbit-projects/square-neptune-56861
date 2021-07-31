"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surround = void 0;
function surround(obj, arg) {
    return !obj ? arg : (obj.startsWith(arg) ? '' : arg) + obj + (obj.endsWith(arg) ? '' : arg);
}
exports.surround = surround;
//# sourceMappingURL=surround.js.map