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
exports.buildPlaceholder = void 0;
var react_1 = __importDefault(require("react"));
var common_1 = require("@uniformdev/common");
function buildPlaceholder(placeholderComponent, r, renderingIndex, placeholderKey, renderingContext, logger) {
    return {
        // this is important to keep to `false` otherwise script tags will be wrapped in placeholder tags
        replaceChildren: false,
        shouldProcessNode: function (node) {
            return node.name && node.name === 'placeholder';
        },
        processNode: function (node, _children, index) {
            if (!r.id) {
                throw new Error('no r.id');
            }
            var newPlaceholderKey = node.attribs['data-placeholder-key'] ||
                common_1.throwException('No attribs.data-placeholder-key, attribs: ' + JSON.stringify(node.attribs));
            if (newPlaceholderKey.includes('$(Rendering.UniqueId)')) {
                var scIdformat = common_1.tryFormatGuid(r.id, 'B').toUpperCase();
                newPlaceholderKey = common_1.replace(newPlaceholderKey, '$(Rendering.UniqueId)', scIdformat);
            }
            newPlaceholderKey = common_1.trimEnd(placeholderKey, '/') + '/' + common_1.trimStart(newPlaceholderKey, '/');
            logger.debug('Constructing nested placeholder with key: ' + newPlaceholderKey);
            var placeholderProps = {
                key: r.id + renderingIndex + newPlaceholderKey,
                index: index,
                placeholderKey: newPlaceholderKey,
                renderingContext: __assign({}, renderingContext),
            };
            return react_1.default.createElement(placeholderComponent, placeholderProps);
        },
    };
}
exports.buildPlaceholder = buildPlaceholder;
//# sourceMappingURL=buildPlaceholder.js.map