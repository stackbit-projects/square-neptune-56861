import React from 'react';
export function buildLinkTag(_logger) {
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
                    return React.createElement('link', linkProps);
                }
                else {
                    if (!innerData) {
                        //console.log('Ignoring empty link');
                        return React.createElement(React.Fragment, undefined);
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
                    return React.createElement('link', linkProps);
                }
            }
            return React.createElement(React.Fragment, undefined);
        },
    };
}
;
//# sourceMappingURL=buildLinkTag.js.map