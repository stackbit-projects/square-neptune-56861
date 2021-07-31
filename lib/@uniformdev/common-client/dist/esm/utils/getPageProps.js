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
import { fetchWithRetry } from '@uniformdev/common';
import { parseGuid } from '@uniformdev/common';
import { getPageUrl } from './getPageUrl';
import { convertDataItemToRuntimeItem } from './convertDataItemToRuntimeItem';
import { noopLogger } from './noopLogger';
export function getPageItem(path, logger, config) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDataItem(path, 'page', logger, config)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var readFileAsync = typeof window === 'undefined' ? eval("(require('util').promisify)(require('fs').readFile)") : undefined;
var existsAsync = typeof window === 'undefined' ? eval("(require('util').promisify)(require('fs').exists)") : undefined;
export function getDataItem(path, type, logger, config) {
    return __awaiter(this, void 0, void 0, function () {
        var filename, _a, _b, itemUrl, responseText, response, item, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(readFileAsync && existsAsync)) return [3 /*break*/, 3];
                    filename = 'public/uniform/api/content/' + config.UNIFORM_API_SITENAME + '/' + type + path;
                    if (filename.endsWith('/')) {
                        filename = filename.substring(0, filename.length - 1);
                    }
                    filename += '.json';
                    return [4 /*yield*/, existsAsync(filename)];
                case 1:
                    if (!_c.sent()) return [3 /*break*/, 3];
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, readFileAsync(filename)];
                case 2: return [2 /*return*/, _b.apply(_a, [(_c.sent()).toString()])];
                case 3:
                    itemUrl = getPageUrl(path, type, config);
                    logger.debug('Making HTTP request (data): ' + itemUrl);
                    responseText = "";
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 7, , 8]);
                    return [4 /*yield*/, fetchWithRetry(logger, itemUrl, 3)];
                case 5:
                    response = _c.sent();
                    if (response.status !== 200) {
                        throw new Error('No item, ajax request to ' +
                            response.url +
                            ' returned ' +
                            response.status +
                            ' code, text: ' +
                            response.statusText);
                    }
                    return [4 /*yield*/, response.text()];
                case 6:
                    responseText = _c.sent();
                    item = JSON.parse(responseText);
                    if (!item.id)
                        throw new Error('no item.id, ' + itemUrl + ', ' + JSON.stringify(item));
                    return [2 /*return*/, convertDataItemToRuntimeItem(item, undefined, path)];
                case 7:
                    e_1 = _c.sent();
                    logger.error('!ERROR requesting item url: ' + itemUrl);
                    logger.error('!responseText: ' + responseText);
                    logger.error('!details: ' + e_1.toString());
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/, convertDataItemToRuntimeItem(undefined, undefined, path)];
            }
        });
    });
}
export function getDatasources(page) {
    return __awaiter(this, void 0, void 0, function () {
        var pageDatasources, datasources, id, datasource, guid;
        return __generator(this, function (_a) {
            pageDatasources = page.datasources || {};
            datasources = {};
            for (id in pageDatasources) {
                if (!pageDatasources.hasOwnProperty(id))
                    continue;
                datasource = convertDataItemToRuntimeItem(pageDatasources[id], undefined, undefined);
                guid = parseGuid(id);
                datasources[guid] = datasource;
            }
            return [2 /*return*/, datasources];
        });
    });
}
export function getHtml(page) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, ((_a = page.mvc) === null || _a === void 0 ? void 0 : _a.html) || {}];
        });
    });
}
export function getPageProps(asPath, config, logger) {
    if (logger === void 0) { logger = noopLogger; }
    return __awaiter(this, void 0, void 0, function () {
        var path, item, home, datasources, html, props;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.info("Rendering page with path: " + asPath);
                    if (asPath && asPath.startsWith('/-'))
                        throw new Error('Must not be handled by page!');
                    path = asPath + (asPath.endsWith('/') ? '' : '/');
                    return [4 /*yield*/, getPageItem(path, logger, config)];
                case 1:
                    item = _a.sent();
                    home = item;
                    return [4 /*yield*/, getDatasources(item)];
                case 2:
                    datasources = _a.sent();
                    return [4 /*yield*/, getHtml(item)];
                case 3:
                    html = _a.sent();
                    if (!item) {
                        throw new Error('No context item passed');
                    }
                    logger.debug("Resolved page '" + path + "'");
                    props = {
                        datasources: datasources,
                        html: html,
                        item: item,
                        page: item,
                        home: home,
                        path: path,
                    };
                    return [2 /*return*/, props];
            }
        });
    });
}
//# sourceMappingURL=getPageProps.js.map