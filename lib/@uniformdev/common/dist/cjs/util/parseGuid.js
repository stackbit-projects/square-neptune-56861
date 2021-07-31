"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGuid = void 0;
var __1 = require("..");
function parseGuid(value) {
    return __1.tryParseGuid(value) || __1.throwException("Cannot parse GUID: " + value);
}
exports.parseGuid = parseGuid;
//# sourceMappingURL=parseGuid.js.map