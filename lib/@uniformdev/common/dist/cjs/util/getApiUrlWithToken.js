"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiUrlWithToken = void 0;
function getApiUrlWithToken(config, relativePath) {
    var apiUrl = config.UNIFORM_API_URL;
    var uri = new URL(apiUrl.endsWith('/') ? apiUrl : apiUrl + '/');
    if (relativePath) {
        uri = new URL(relativePath.startsWith('.') ? relativePath : '.' + relativePath, uri);
    }
    if (config.UNIFORM_OPTIONS_PREVIEW) {
        uri.searchParams.set('uniform_preview', 'true');
    }
    return uri.href.toLowerCase();
}
exports.getApiUrlWithToken = getApiUrlWithToken;
//# sourceMappingURL=getApiUrlWithToken.js.map