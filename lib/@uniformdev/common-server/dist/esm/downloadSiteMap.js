var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getApiUrlWithToken, getEnv } from '@uniformdev/common';
import { fetchWithRetry } from '@uniformdev/common';
var readFileAsync = require('util').promisify(require('fs').readFile);
var existsAsync = require('util').promisify(require('fs').exists);
var MAX_ATTEMPTS = 10;
var DELAY_SECONDS = 2;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
export function downloadSiteMap(config, logger) {
    return __awaiter(this, void 0, void 0, function () {
        function doDownloadSiteMap(suffix, apiUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var response, value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetchWithRetry(logger, apiUrl, 3, parseInt(getEnv(config.env, 'UNIFORM_PUBLISH_MAP_REQUEST_TIMEOUT', '90000')))];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            value = _a.sent();
                            if (!value.id || !value.template) {
                                throw new Error('The API call returned unexpected data. url: ' +
                                    suffix +
                                    ', props: ' +
                                    Object.getOwnPropertyNames(value));
                            }
                            return [2 /*return*/, value];
                    }
                });
            });
        }
        var mapServiceEndpoint, suffix, filename, _a, _b, ex_1, attempt, sitemap, ex_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    mapServiceEndpoint = config.UNIFORM_API_MAPSERVICE;
                    if (!mapServiceEndpoint) {
                        mapServiceEndpoint = '/uniform/api/content/${UNIFORM_API_SITENAME}/map.json';
                    }
                    mapServiceEndpoint = mapServiceEndpoint.replace('${UNIFORM_API_SITENAME}', config.UNIFORM_API_SITENAME);
                    logger.info("Using '" + mapServiceEndpoint + "' as map service endpoint");
                    suffix = mapServiceEndpoint.toLowerCase();
                    filename = 'public' + suffix;
                    return [4 /*yield*/, existsAsync(filename)];
                case 1:
                    if (!_c.sent()) return [3 /*break*/, 3];
                    logger.info('Reading sitemap from local file: ' + filename);
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, readFileAsync(filename)];
                case 2: return [2 /*return*/, _b.apply(_a, [(_c.sent()).toString()])];
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, doDownloadSiteMap(suffix, getApiUrlWithToken(config, suffix))];
                case 4: return [2 /*return*/, _c.sent()];
                case 5:
                    ex_1 = _c.sent();
                    if (MAX_ATTEMPTS <= 1) {
                        throw ex_1;
                    }
                    return [3 /*break*/, 6];
                case 6:
                    attempt = 1;
                    _c.label = 7;
                case 7:
                    if (!true) return [3 /*break*/, 13];
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 11, , 12]);
                    logger.warn("Failed to download site map (attempt #" + attempt + "), it will retry in " + DELAY_SECONDS + "s...");
                    return [4 /*yield*/, sleep(DELAY_SECONDS * 1000)];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, doDownloadSiteMap(suffix, getApiUrlWithToken(config, suffix))];
                case 10:
                    sitemap = _c.sent();
                    logger.info("SUCCESS! Site map has been downloaded");
                    return [2 /*return*/, sitemap];
                case 11:
                    ex_2 = _c.sent();
                    if (attempt >= MAX_ATTEMPTS) {
                        throw ex_2;
                    }
                    return [3 /*break*/, 12];
                case 12:
                    ++attempt;
                    return [3 /*break*/, 7];
                case 13: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=downloadSiteMap.js.map