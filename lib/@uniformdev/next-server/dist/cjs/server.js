"use strict";
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
exports.server = void 0;
var next_1 = __importDefault(require("next"));
var common_server_1 = require("@uniformdev/common-server");
var common_1 = require("@uniformdev/common");
var defaultExtensionFilter = [
    'txt',
    'css',
    'js',
    'gif',
    'png',
    'jpg',
    'tiff',
    'webp',
    'jpeg',
    'bmp',
    'ico',
    'woff',
    'woff2',
    'map',
    'svg',
    'eot',
    'ttf',
    'otf',
];
var defaultPathFilter = ['/_next/', '/internal/process/next_tick.js'];
function server(_a) {
    var _this = this;
    var _b = _a === void 0 ? {
        logger: common_server_1.serverLogger,
        extensionFilter: defaultExtensionFilter,
        pathFilter: defaultPathFilter,
    } : _a, _c = _b.logger, logger = _c === void 0 ? common_server_1.serverLogger : _c, _d = _b.extensionFilter, extensionFilter = _d === void 0 ? defaultExtensionFilter : _d, _e = _b.pathFilter, pathFilter = _e === void 0 ? defaultPathFilter : _e;
    if (!logger) {
        throw new Error('logger must be defined for `next-server`');
    }
    logger.info("Using extension filter: " + extensionFilter.join(','));
    logger.info("Using path filter: " + defaultPathFilter.join(','));
    process.env.UNIFORM_IS_AT_RUNTIME = '1';
    var uniformServerConfig = common_server_1.parseUniformServerConfig(process.env, logger);
    var createAndStartUniformServer = function (nextServer) {
        return __awaiter(this, void 0, void 0, function () {
            var server, handler_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, common_server_1.createUniformServer(logger, {
                            uniformServerConfig: uniformServerConfig,
                        })];
                    case 1:
                        server = _a.sent();
                        if (nextServer) {
                            handler_1 = nextServer.getRequestHandler();
                            server.get('*', function (req, res) {
                                var path = decodeURI(req.path) || '/';
                                if (path.toLowerCase().endsWith('/layouts/system/visitoridentification.js')) {
                                    res.send('// uniform stub for Sitecore visitor identification script: ' + path);
                                    return;
                                }
                                var shouldExcludeByExtension = extensionFilter &&
                                    Array.isArray(extensionFilter) &&
                                    extensionFilter.includes(path.substr(path.lastIndexOf('.') + 1));
                                var shouldExcludeByPath = pathFilter && Array.isArray(pathFilter) && pathFilter.some(function (p) { return path.startsWith(p); });
                                if (shouldExcludeByExtension || shouldExcludeByPath) {
                                    logger.debug("Ignoring path " + path + " due to path or extension filter");
                                    return handler_1(req, res);
                                }
                                if (!/\/$|\.\w+$/g.exec(path)) {
                                    // redirect if /foo and not /foo.png
                                    res.redirect(302, req.path + '/');
                                    return;
                                }
                                logger.info('Incoming HTTP ' + req.method + ' ' + path);
                                try {
                                    return nextServer.render(req, res, '/index');
                                }
                                catch (ex) {
                                    logger.error('Failed to handle request\n' + JSON.stringify(ex));
                                    return;
                                }
                            });
                        }
                        common_server_1.startUniformServer(server, uniformServerConfig, logger);
                        return [2 /*return*/];
                }
            });
        });
    };
    var mode = uniformServerConfig.UNIFORM_MODE;
    logger.info('Uniform in ' + mode + ' mode.');
    var api = uniformServerConfig.UNIFORM_API_URL;
    logger.info(' API URL: ' + api);
    var data = uniformServerConfig.UNIFORM_DATA_URL;
    logger.info('Data URL: ' + data);
    var exportCommand = common_1.getEnv(process.env, 'UNIFORM_PUBLISH_NEXT_EXPORT_COMMAND', '').trim();
    if (exportCommand && !exportCommand.includes('__DIR__')) {
        throw new Error('The UNIFORM_PUBLISH_NEXT_EXPORT_COMMAND setting does not contain the __DIR__ token that will be replaced with dir to export to');
    }
    if (mode === common_server_1.UniformServerMode.publish) {
        createAndStartUniformServer(undefined);
    } // preview or mixed
    else {
        logger.info('NextJS is being activated...');
        var app_1 = next_1.default({ dev: process.env.NODE_ENV !== 'production' });
        app_1.prepare().then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createAndStartUniformServer(app_1)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
}
exports.server = server;
//# sourceMappingURL=server.js.map