"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLayout = void 0;
var common_1 = require("@uniformdev/common");
var _1 = require(".");
var __1 = require("..");
var getEntries = function (params) {
    var e_1, _a;
    var obj = {};
    try {
        // @ts-ignore
        for (var _b = __values(params.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (params.getAll(key).length > 1) {
                // @ts-ignore
                obj[key] = params.getAll(key);
            }
            else {
                // @ts-ignore
                obj[key] = params.get(key);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return obj;
};
function buildLayout(props, initial) {
    var _a, _b;
    if (initial === void 0) { initial = false; }
    var page = props.item, home = props.home, datasources = props.datasources, html = props.html, uniformContext = props.uniformContext;
    if (!page)
        throw new Error('no page');
    if (!datasources)
        throw new Error('no datasources');
    if (!html)
        throw new Error('no html');
    // if (!components) throw new Error('no components');
    // it's okay because of magic button if (Object.getOwnPropertyNames(components).length <= 0) throw new Error('components are empty');
    var logger = !uniformContext || !uniformContext.logger ? _1.noopLogger : uniformContext.logger;
    logger.debug('Rendering dynamic layout of ' + page.id);
    var placeholders = {};
    var renderings = page.renderings;
    if (!renderings)
        throw new Error('no renderings');
    for (var i = 0; i < renderings.length; ++i) {
        var r = renderings[i];
        if (!r || !r.id) {
            logger.error('Rendering #' + i + ' has no id: ', JSON.stringify(r ? r.id : "undefined rendering"));
            continue;
        }
        var placeholder = (r.placeholder || '').trim().toLowerCase() || 'main';
        var rawDatasource = r.settings.DataSource ? r.settings.DataSource.toLowerCase() : '';
        var datasource = common_1.tryParseGuid(rawDatasource);
        var tagName = r.componentName;
        var dataSourceItem = (datasource && datasources[datasource]) || undefined;
        if (datasource && !dataSourceItem && r.renderingType !== __1.RenderingType.mvc) {
            logger.warn("The '" + (tagName || r.id) + "' component's datasource '" + datasource + "' ('" + rawDatasource + "') cannot be resolved.");
            continue;
        }
        var item = dataSourceItem || page;
        var parseRenderingParameters = function (parameters) {
            if (!parameters) {
                return undefined;
            }
            // @ts-ignore
            return getEntries(new URLSearchParams(parameters));
        };
        var rendering = {
            id: common_1.tryParseGuid(r.id),
            renderingId: common_1.tryParseGuid(r.renderingId),
            renderingType: r.renderingType,
            componentName: tagName,
            settings: r.settings,
            datasource: datasource || '',
            hidden: false,
            renderingContext: {
                item: item,
                page: page,
                home: home || page,
                placeholders: placeholders,
                datasources: datasources,
                html: html,
                datasource: (_a = r.settings) === null || _a === void 0 ? void 0 : _a.DataSource,
                parameters: parseRenderingParameters((_b = r.settings) === null || _b === void 0 ? void 0 : _b.Parameters)
            },
        };
        if (initial) {
            if (r.settings.Rules) {
                var rules = r.settings.Rules.Rules;
                if (rules && rules.length > 0) {
                    for (var i_1 = 0; i_1 < rules.length; ++i_1) {
                        var rule = rules[i_1];
                        if (rule.UniqueId === '00000000-0000-0000-0000-000000000000') {
                            var actions = rule.Actions;
                            if (actions && actions.length > 0) {
                                for (var j = 0; j < actions.length; ++j) {
                                    var action = actions[j];
                                    if (action.type === 'Sitecore.Rules.ConditionalRenderings.HideRenderingAction') {
                                        rendering.hidden = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (!placeholders.hasOwnProperty(placeholder)) {
            placeholders[placeholder] = [];
        }
        placeholders[placeholder].push(rendering);
        logger.debug('Registering ' + rendering.renderingId + ' to ' + placeholder);
    }
    return placeholders;
}
exports.buildLayout = buildLayout;
//# sourceMappingURL=buildLayout.js.map