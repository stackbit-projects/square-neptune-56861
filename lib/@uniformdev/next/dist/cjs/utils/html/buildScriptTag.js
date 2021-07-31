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
exports.buildScriptTag = void 0;
var react_1 = __importDefault(require("react"));
// @ts-ignore
function buildScriptTag(logger) {
    return {
        // this is important to keep to `false` otherwise script tags will be wrapped in script tags
        replaceChildren: false,
        shouldProcessNode: function (node) {
            return node.name && node.name === 'script';
        },
        processNode: function (node, _children) {
            var src = node.attribs.src;
            if (src || node.children.length === 1) {
                var scriptProps = __assign({}, node.attribs);
                if (node.attribs.async !== undefined) {
                    scriptProps.async = true;
                }
                if (node.attribs.defer !== undefined) {
                    //logger.info("defer: " + node.attribs.defer);
                    scriptProps.defer = true;
                }
                // handling inline script tag
                if (!src) {
                    scriptProps.dangerouslySetInnerHTML = {
                        __html: node.children[0].data || '',
                    };
                }
                // sometimes class name can be set on script tag
                if (scriptProps.class) {
                    scriptProps.className = scriptProps.class;
                }
                return react_1.default.createElement('script', scriptProps);
            }
            return react_1.default.createElement('script', undefined);
        },
    };
}
exports.buildScriptTag = buildScriptTag;
//# sourceMappingURL=buildScriptTag.js.map