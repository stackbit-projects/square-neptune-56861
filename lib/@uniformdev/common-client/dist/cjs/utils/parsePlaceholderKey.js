"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePlaceholderKey = void 0;
var common_1 = require("@uniformdev/common");
function parsePlaceholderKey(key) {
    if (key === '/') {
        return '/';
    }
    key = key.trim();
    key = key.toLowerCase();
    key = common_1.trimEnd(key, '/');
    key = key || 'main';
    return key;
}
exports.parsePlaceholderKey = parsePlaceholderKey;
//# sourceMappingURL=parsePlaceholderKey.js.map