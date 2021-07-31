"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popVisibleRenderingsFromPlaceholdersMap = void 0;
var common_1 = require("@uniformdev/common");
function popVisibleRenderingsFromPlaceholdersMap(placeholders, placeholderKey, logger) {
    var visibleRenderings = [];
    common_1.keys(placeholders).forEach(function (x) {
        if (false
            // --------------------------------------------------------
            // Exact match
            //   e.g. '/main/content' matches '/main/content'
            //
            || (x == placeholderKey)
            // --------------------------------------------------------
            // Loose placeholder
            //   e.g. 'content' matches '/main/content'
            //   but not '/main-content' and not '/main/content/top'
            //
            || (!x.startsWith('/') && placeholderKey.endsWith('/' + x))
            // --------------------------------------------------------
            || false) {
            var renderings_1 = placeholders[x];
            renderings_1.forEach(function (r, index) {
                if (!r || r.hidden)
                    return;
                logger.debug('Adding ' + r.componentName + ' [' + r.id + '] to ' + placeholderKey + ' (and removing from list of free renderings)');
                visibleRenderings.push(r);
                renderings_1[index] = undefined;
            });
        }
    });
    return visibleRenderings;
}
exports.popVisibleRenderingsFromPlaceholdersMap = popVisibleRenderingsFromPlaceholdersMap;
//# sourceMappingURL=popVisibleRenderingsFromPlaceholdersMap.js.map