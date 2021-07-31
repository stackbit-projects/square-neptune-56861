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
export function buildArrayOfPaths(item, logger) {
    return __awaiter(this, void 0, void 0, function () {
        function updateArrayOfPaths(item, itemUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var children, _a, _b, _i, childName, childUrl, ex_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            logger.info("Queuing: " + itemUrl);
                            if (item.isPage) {
                                paths.push(itemUrl);
                            }
                            children = item.children;
                            if (!children) {
                                return [2 /*return*/];
                            }
                            _a = [];
                            for (_b in children)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            childName = _a[_i];
                            if (!children.hasOwnProperty(childName)) {
                                return [3 /*break*/, 5];
                            }
                            childUrl = itemUrl ? itemUrl + "/" + childName : "" + childName;
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, updateArrayOfPaths(children[childName], childUrl)];
                        case 3:
                            _c.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            ex_1 = _c.sent();
                            logger.error("Failed to cache site map item " + childUrl + ".");
                            throw ex_1;
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        var paths;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    paths = [];
                    return [4 /*yield*/, updateArrayOfPaths(item, '')];
                case 1:
                    _a.sent();
                    return [2 /*return*/, paths];
            }
        });
    });
}
//# sourceMappingURL=buildArrayOfPaths.js.map