"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpJsonData = void 0;
var p_limit_1 = __importDefault(require("p-limit"));
var common_1 = require("@uniformdev/common");
var common_2 = require("@uniformdev/common");
var ErrorWithData = /** @class */ (function (_super) {
    __extends(ErrorWithData, _super);
    function ErrorWithData(msg, data) {
        var _this = _super.call(this, msg) || this;
        _this.data = data;
        return _this;
    }
    return ErrorWithData;
}(Error));
function dumpJsonData(_outputDir, paths, config, logger) {
    return __awaiter(this, void 0, void 0, function () {
        function inner(path) {
            var path;
            return __awaiter(this, void 0, void 0, function () {
                var text, cachePage, page;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = (common_1.trim(common_1.trim(path, '/'), '/')).toLowerCase();
                            text = (paths.indexOf(path) + 1) + "/" + paths.length + ", path: " + path;
                            logger.debug("Processing item " + text);
                            cachePage = function () { return __awaiter(_this, void 0, void 0, function () {
                                var pagePath, request, _a, _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            pagePath = '/uniform/api/content/' + sitename + '/page/' + path;
                                            return [4 /*yield*/, common_2.fetchWithRetry(logger, common_1.getApiUrlWithToken(config, pagePath))];
                                        case 1:
                                            request = _d.sent();
                                            if (!(request.status !== 200)) return [3 /*break*/, 4];
                                            _a = ErrorWithData.bind;
                                            _b = [void 0, "HTTP request " + request.url + " failed with status code " + request.status];
                                            _c = (request.statusText && request.statusText.length > 200 && request.statusText);
                                            if (_c) return [3 /*break*/, 3];
                                            return [4 /*yield*/, request.text()];
                                        case 2:
                                            _c = (_d.sent());
                                            _d.label = 3;
                                        case 3: throw new (_a.apply(ErrorWithData, _b.concat([_c])))();
                                        case 4: return [4 /*yield*/, request.json()];
                                        case 5: return [2 /*return*/, _d.sent()];
                                    }
                                });
                            }); };
                            return [4 /*yield*/, cachePage()];
                        case 1:
                            page = _a.sent();
                            if (!page) {
                                throw new Error("page");
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        var sitename, limit, error_1, promises, ex_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sitename = config.UNIFORM_API_SITENAME;
                    if (!paths || paths.length === 0) {
                        throw new Error("no paths");
                    }
                    limit = p_limit_1.default(parseInt(common_1.getEnv(config.env, 'UNIFORM_PUBLISH_PREFETCH_CONCURRENCY', '4')));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    error_1 = undefined;
                    promises = paths.map(function (path) {
                        return limit(function () { return __awaiter(_this, void 0, void 0, function () {
                            var ex_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (error_1) {
                                            return [2 /*return*/];
                                        }
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, inner(path)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        ex_2 = _a.sent();
                                        logger.error("An error occurred during processing " + path);
                                        error_1 = ex_2;
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    _a.sent();
                    logger.info('All jobs have been completed');
                    if (error_1) {
                        throw error_1;
                    }
                    logger.info('Dump Json Data has completed');
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    logger.error('Failed to build static site files');
                    throw ex_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.dumpJsonData = dumpJsonData;
//# sourceMappingURL=dumpJsonData.js.map