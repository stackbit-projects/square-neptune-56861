"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLinkTag = void 0;
var react_1 = __importDefault(require("react"));
function buildLinkTag(_logger) {
    return {
        replaceChildren: false,
        shouldProcessNode: function (node) {
            return node.name && node.name === 'link';
        },
        processNode: function (node, _children, index) {
            var href = node.attribs.href;
            if (href && href.startsWith('-/media/')) {
                href = href.replace('-/media/', '/-/media/');
            }
            var as = node.attribs.as;
            var onload = node.attribs.onload;
            //console.log('Adding link onload' + onload);
            var rel = node.attribs.rel;
            //console.log('Adding link rel' + rel);
            if (href && href.indexOf('.css') > 0 && rel !== 'stylesheet') {
                rel = 'stylesheet';
            }
            var innerData = node.children && node.children.length > 0 ? node.children[0].data : '';
            if (href || node.children.length === 1) {
                //console.log('Adding link ' + href);
                if (href) {
                    var linkProps = {
                        key: href,
                        href: href,
                        rel: rel,
                        as: as,
                        onload: onload,
                    };
                    return react_1.default.createElement('link', linkProps);
                }
                else {
                    if (!innerData) {
                        //console.log('Ignoring empty link');
                        return react_1.default.createElement(react_1.default.Fragment, undefined);
                    }
                    var linkProps = {
                        key: 'nosrc' + index,
                        index: index,
                        rel: rel,
                        as: as,
                        onload: onload,
                        dangerouslySetInnerHTML: {
                            __html: innerData,
                        },
                    };
                    return react_1.default.createElement('link', linkProps);
                }
            }
            return react_1.default.createElement(react_1.default.Fragment, undefined);
        },
    };
}
exports.buildLinkTag = buildLinkTag;
;
//# sourceMappingURL=buildLinkTag.js.map