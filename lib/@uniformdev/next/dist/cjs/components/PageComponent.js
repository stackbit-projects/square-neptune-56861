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
exports.PageComponent = void 0;
var react_1 = __importDefault(require("react"));
var common_1 = require("@uniformdev/common");
var common_client_1 = require("@uniformdev/common-client");
var withUniformContext_1 = require("../enhancers/withUniformContext");
var PageComponentClass = /** @class */ (function (_super) {
    __extends(PageComponentClass, _super);
    function PageComponentClass(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { placeholders: common_client_1.buildLayout(props, true) };
        _this.logger = props.uniformContext && props.uniformContext.logger || common_1.throwException("logger");
        return _this;
    }
    //workaround for spa enabled where it should raise uniform.pageload event. 
    //componentDidUpdate triggered twice. first time when page changed and second time when placeholder set state
    //we have to trigger raise event once, that why check when previous path and current path are equal.
    PageComponentClass.prototype.componentDidUpdate = function (prevProps) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (prevProps == undefined) {
                    return [2 /*return*/];
                }
                if (prevProps.path === this.props.path) {
                    this.raisePageLoadEvent();
                }
                return [2 /*return*/];
            });
        });
    };
    PageComponentClass.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //TODO: should be updated with new tracker
                this.raisePageLoadEvent();
                return [2 /*return*/];
            });
        });
    };
    PageComponentClass.prototype.createRenderingContext = function () {
        var props = this.props;
        var placeholders = common_client_1.buildLayout(this.props, true);
        // info is not shown in netlify deploy log, so 'warn' is used
        this.logger.warn('Render page: ' + props.path);
        this.logger.debug('Render page: ' + props.path, { placeholders: placeholders });
        return {
            placeholders: placeholders || common_1.throwException('no placeholders'),
            item: props.item || common_1.throwException('no item'),
            page: props.page || common_1.throwException('no page'),
            home: props.home || props.item || common_1.throwException('no home'),
            datasources: props.datasources || common_1.throwException('no datasources'),
            html: props.html || common_1.throwException('no html'),
        };
    };
    PageComponentClass.prototype.render = function () {
        if (typeof this.props.children !== 'function') {
            throw new Error('`children` prop of `PageComponent` is required and must be a function.');
        }
        var renderingContext = this.createRenderingContext();
        return this.props.children(renderingContext);
    };
    PageComponentClass.prototype.raisePageLoadEvent = function () {
        this.logger.debug("raise 'uniform.pageload' event");
        document.dispatchEvent(new Event('uniform.pageload'));
    };
    return PageComponentClass;
}(react_1.default.Component));
exports.PageComponent = withUniformContext_1.withUniformContext(PageComponentClass);
//# sourceMappingURL=PageComponent.js.map