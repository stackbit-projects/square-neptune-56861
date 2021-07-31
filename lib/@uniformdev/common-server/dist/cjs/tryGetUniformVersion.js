"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryGetUniformVersion = void 0;
var fs_1 = require("fs");
function tryGetUniformVersion(logger) {
    var packageFilePath = './node_modules/@uniformdev/common/package.json';
    if (!fs_1.existsSync(packageFilePath)) {
        return null;
    }
    try {
        return JSON.parse(fs_1.readFileSync(packageFilePath).toString()).version;
    }
    catch (ex) {
        logger.error('Failed to read version from ' + packageFilePath);
        throw ex;
    }
}
exports.tryGetUniformVersion = tryGetUniformVersion;
//# sourceMappingURL=tryGetUniformVersion.js.map