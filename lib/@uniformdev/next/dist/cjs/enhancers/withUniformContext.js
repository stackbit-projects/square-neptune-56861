"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withUniformContext = void 0;
var react_1 = __importDefault(require("react"));
var UniformContext_1 = require("../components/UniformContext");
function withUniformContext(Component) {
    return function ComponentWithContext(props) {
        return (react_1.default.createElement(UniformContext_1.UniformContext.Consumer, null, function (context) { return react_1.default.createElement(Component, __assign({}, props, { uniformContext: context })); }));
    };
}
exports.withUniformContext = withUniformContext;
//# sourceMappingURL=withUniformContext.js.map