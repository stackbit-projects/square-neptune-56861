import { tryParseGuid, throwException } from '..';
export function parseGuid(value) {
    return tryParseGuid(value) || throwException("Cannot parse GUID: " + value);
}
//# sourceMappingURL=parseGuid.js.map