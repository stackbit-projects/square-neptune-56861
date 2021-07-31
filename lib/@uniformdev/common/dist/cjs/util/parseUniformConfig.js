"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUniformConfig = void 0;
var __1 = require("..");
function parseUniformConfig(env, runtime) {
    if (runtime === void 0) { runtime = true; }
    var UNIFORM_API_URL = __1.getEnv(env, 'UNIFORM_API_URL', runtime ? undefined : '');
    var UNIFORM_API_SITENAME = __1.getEnv(env, 'UNIFORM_API_SITENAME', runtime ? undefined : '');
    var UNIFORM_DATA_URL = __1.getEnv(env, 'UNIFORM_DATA_URL', runtime ? undefined : '');
    var UNIFORM_API_MAPSERVICE = __1.getEnv(env, 'UNIFORM_API_MAPSERVICE', '/uniform/api/content/${UNIFORM_API_SITENAME}/map.json');
    var UNIFORM_OPTIONS_DEBUG = __1.getBoolEnv(env, 'UNIFORM_OPTIONS_DEBUG', false);
    var UNIFORM_OPTIONS_PREFETCH_LINKS = __1.getBoolEnv(env, 'UNIFORM_OPTIONS_PREFETCH_LINKS', false);
    var UNIFORM_OPTIONS_MVC_SPA_ENABLED = __1.getBoolEnv(env, 'UNIFORM_OPTIONS_MVC_SPA_ENABLED', true);
    var UNIFORM_OPTIONS_ANALYTICS_ENABLED = __1.getBoolEnv(env, 'UNIFORM_OPTIONS_ANALYTICS_ENABLED', false);
    var UNIFORM_OPTIONS_PREVIEW = __1.getBoolEnv(env, 'UNIFORM_OPTIONS_PREVIEW', true);
    return {
        UNIFORM_API_URL: UNIFORM_API_URL,
        UNIFORM_API_SITENAME: UNIFORM_API_SITENAME,
        UNIFORM_DATA_URL: UNIFORM_DATA_URL,
        UNIFORM_API_MAPSERVICE: UNIFORM_API_MAPSERVICE,
        UNIFORM_OPTIONS_PREVIEW: UNIFORM_OPTIONS_PREVIEW,
        UNIFORM_OPTIONS_DEBUG: UNIFORM_OPTIONS_DEBUG,
        UNIFORM_OPTIONS_PREFETCH_LINKS: UNIFORM_OPTIONS_PREFETCH_LINKS,
        UNIFORM_OPTIONS_MVC_SPA_ENABLED: UNIFORM_OPTIONS_MVC_SPA_ENABLED,
        UNIFORM_OPTIONS_ANALYTICS_ENABLED: UNIFORM_OPTIONS_ANALYTICS_ENABLED,
    };
}
exports.parseUniformConfig = parseUniformConfig;
//# sourceMappingURL=parseUniformConfig.js.map