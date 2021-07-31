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
exports.createRendering = void 0;
var react_1 = __importDefault(require("react"));
var head_1 = __importDefault(require("next/head"));
var common_1 = require("@uniformdev/common");
var common_2 = require("@uniformdev/common");
var createRenderingFromHtml_1 = require("./createRenderingFromHtml");
var __1 = require("..");
var __2 = require("..");
function createRendering(r, placeholderKey, index, components, props, logger, options) {
    if (!r)
        throw new Error('no r');
    var componentName = r.componentName || common_1.throwException('impossible');
    var config = common_2.parseUniformConfig(__2.getNextConfig());
    // it's NOT okay even if magic button is used there must be at least Placeholder component
    if (!components)
        throw new Error('no components');
    var isNodeJs = typeof process !== 'undefined' && process.env && process.env['PATH'] || false;
    if (isNodeJs) {
        var componentLoaderName = r.componentName + __1.COMPONENT_LOADER_SUFFIX;
        if (components[componentLoaderName]) {
            if (!componentName.endsWith(__1.COMPONENT_LOADER_SUFFIX)) {
                // if component has personalization, replace component with its own component-specific loader 
                // to only show personalized version rendered in browser
                if (r.settings.Rules.Rules && r.settings.Rules.Rules.length > 0) {
                    logger.debug('Inserting component loader ' + componentLoaderName);
                    return createRendering(__assign(__assign({}, r), { componentName: componentLoaderName }), placeholderKey, index, components, props, logger, options);
                }
            }
        }
        else if (components[__1.GLOBAL_LOADER]) {
            if (r.componentName !== __1.GLOBAL_LOADER && !componentName.endsWith(__1.COMPONENT_LOADER_SUFFIX)) {
                // if component has personalization, replace component with global loader (if there's no own component-sepcific loader) 
                // to only show personalized version rendered in browser
                if (r.settings.Rules.Rules && r.settings.Rules.Rules.length > 0) {
                    return createRendering(__assign(__assign({}, r), { componentName: __1.GLOBAL_LOADER }), placeholderKey, index, components, props, logger, options);
                }
            }
        }
    }
    var renderingContext = __assign({}, r.renderingContext);
    var ds = r.datasource || '00000000000000000000000000000000';
    logger.debug("- create rendering, name: " + r.componentName + ", id:" + r.renderingId + ", ds: " + ds);
    {
        var htmlMap = props.renderingContext.html;
        if (htmlMap && componentName !== __1.GLOBAL_LOADER && !componentName.endsWith(__1.COMPONENT_LOADER_SUFFIX)) {
            var htmlsPerDatasources = htmlMap[r.renderingId || common_1.throwException('renderingId')] || {};
            logger.debug("Checking htmlMap for: " + r.componentName + " id:" + r.renderingId + " ds: " + r.datasource);
            var key = common_1.tryParseGuid(ds) + '|' + r.settings.Parameters;
            logger.debug("Trying to find htmlMap entry with key: " + key);
            var html = htmlsPerDatasources[key];
            // if (html === undefined) {
            //     throw new Error('html for the given datasource is: undefined, key: ' + key);
            // }
            // `html` could be empty string 
            if (html !== null && html !== undefined) {
                if (typeof html === 'string' && !html.startsWith('<javascript-rendering ')) {
                    if (html === undefined) {
                        html = "";
                        logger.warn('No r.componentName and no html available for rendering, r: ' + r.renderingId + ', uid: ' + r.id + ', ds: ' + ds + ', ' + (r.renderingContext.item ? (r.renderingContext.item.id + ', ' + common_1.parseGuid(r.renderingContext.item.id || '')) : ''));
                    }
                    if (!html.startsWith('"{') || !html.endsWith('}"')) {
                        return createRenderingFromHtml_1.createRenderingFromHtml(html, renderingContext, r, placeholderKey, index, components, config, logger, options);
                    }
                    renderingContext.item = JSON.parse(html);
                }
                else {
                    if (html && html.headHtml !== undefined && html.bodyHtml !== undefined) {
                        return (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(head_1.default, null, createRenderingFromHtml_1.createRenderingFromHtml(html.headHtml, renderingContext, r, placeholderKey, index, components, config, logger, options)),
                            createRenderingFromHtml_1.createRenderingFromHtml(html.bodyHtml, renderingContext, r, placeholderKey, index, components, config, logger, options)));
                    }
                }
            }
            else {
                if (!components[componentName]) {
                    logger.warn("html wasn't found for rendering '" + r.componentName + "' (id:" + r.renderingId + " ds: " + r.datasource + ")");
                }
            }
        }
    }
    var component = components[componentName] || common_1.throwException("Cannot find implementation of '" + componentName + "' React component. Check if it is added to the component map.");
    var placeholderComponent = components.Placeholder || common_1.throwException('no components.Placeholder');
    var newProps = {
        key: r.id,
        index: index,
        placeholderComponent: placeholderComponent,
        renderingContext: renderingContext,
    };
    // TODO: important - have to have the "placeholderKey" element in the filter prop list - otherwise Stack Overflow :)
    var filterPropList = ['placeholderKey'].concat(Object.keys(newProps));
    var originalProps = {};
    var anyProps = props;
    Object.keys(props).forEach(function (key) {
        if (!filterPropList.includes(key)) {
            originalProps[key] = anyProps[key];
        }
    });
    logger.debug('Rendering component ' + r.componentName + ' (pure react)');
    return react_1.default.createElement(component, Object.assign({}, newProps, originalProps));
}
exports.createRendering = createRendering;
//# sourceMappingURL=createRendering.js.map