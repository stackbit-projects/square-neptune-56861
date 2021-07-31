import { readFileSync, existsSync, } from 'fs';
export function tryGetUniformVersion(logger) {
    var packageFilePath = './node_modules/@uniformdev/common/package.json';
    if (!existsSync(packageFilePath)) {
        return null;
    }
    try {
        return JSON.parse(readFileSync(packageFilePath).toString()).version;
    }
    catch (ex) {
        logger.error('Failed to read version from ' + packageFilePath);
        throw ex;
    }
}
//# sourceMappingURL=tryGetUniformVersion.js.map