"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsoleLogger = void 0;
var common_1 = require("@uniformdev/common");
var __1 = require("..");
function createConsoleLogger() {
    return common_1.createConsoleLogger(common_1.parseUniformConfig(__1.getNextConfig(), false));
}
exports.createConsoleLogger = createConsoleLogger;
//# sourceMappingURL=createConsoleLogger.js.map