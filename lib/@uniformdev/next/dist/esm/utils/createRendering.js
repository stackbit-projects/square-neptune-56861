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
import React from 'react';
import Head from 'next/head';
import { throwException, parseGuid, tryParseGuid, } from '@uniformdev/common';
import { parseUniformConfig, } from '@uniformdev/common';
import { createRenderingFromHtml } from './createRenderingFromHtml';
import { GLOBAL_LOADER, COMPONENT_LOADER_SUFFIX } from '..';
import { getNextConfig, } from '..';
export function createRendering(r, placeholderKey, index, components, props, logger, options) {
    if (!r)
        throw new Error('no r');
    var componentName = r.componentName || throwException('impossible');
    var config = parseUniformConfig(getNextConfig());
    // it's NOT okay even if magic button is used there must be at least Placeholder component
    if (!components)
        throw new Error('no components');
    var isNodeJs = typeof process !== 'undefined' && process.env && process.env['PATH'] || false;
    if (isNodeJs) {
        var componentLoaderName = r.componentName + COMPONENT_LOADER_SUFFIX;
        if (components[componentLoaderName]) {
            if (!componentName.endsWith(COMPONENT_LOADER_SUFFIX)) {
                // if component has personalization, replace component with its own component-specific loader 
                // to only show personalized version rendered in browser
                if (r.settings.Rules.Rules && r.settings.Rules.Rules.length > 0) {
                    logger.debug('Inserting component loader ' + componentLoaderName);
                    return createRendering(__assign(__assign({}, r), { componentName: componentLoaderName }), placeholderKey, index, components, props, logger, options);
                }
            }
        }
        else if (components[GLOBAL_LOADER]) {
            if (r.componentName !== GLOBAL_LOADER && !componentName.endsWith(COMPONENT_LOADER_SUFFIX)) {
                // if component has personalization, replace component with global loader (if there's no own component-sepcific loader) 
                // to only show personalized version rendered in browser
                if (r.settings.Rules.Rules && r.settings.Rules.Rules.length > 0) {
                    return createRendering(__assign(__assign({}, r), { componentName: GLOBAL_LOADER }), placeholderKey, index, components, props, logger, options);
                }
            }
        }
    }
    var renderingContext = __assign({}, r.renderingContext);
    var ds = r.datasource || '00000000000000000000000000000000';
    logger.debug("- create rendering, name: " + r.componentName + ", id:" + r.renderingId + ", ds: " + ds);
    {
        var htmlMap = props.renderingContext.html;
        if (htmlMap && componentName !== GLOBAL_LOADER && !componentName.endsWith(COMPONENT_LOADER_SUFFIX)) {
            var htmlsPerDatasources = htmlMap[r.renderingId || throwException('renderingId')] || {};
            logger.debug("Checking htmlMap for: " + r.componentName + " id:" + r.renderingId + " ds: " + r.datasource);
            var key = tryParseGuid(ds) + '|' + r.settings.Parameters;
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
                        logger.warn('No r.componentName and no html available for rendering, r: ' + r.renderingId + ', uid: ' + r.id + ', ds: ' + ds + ', ' + (r.renderingContext.item ? (r.renderingContext.item.id + ', ' + parseGuid(r.renderingContext.item.id || '')) : ''));
                    }
                    if (!html.startsWith('"{') || !html.endsWith('}"')) {
                        return createRenderingFromHtml(html, renderingContext, r, placeholderKey, index, components, config, logger, options);
                    }
                    renderingContext.item = JSON.parse(html);
                }
                else {
                    if (html && html.headHtml !== undefined && html.bodyHtml !== undefined) {
                        return (React.createElement(React.Fragment, null,
                            React.createElement(Head, null, createRenderingFromHtml(html.headHtml, renderingContext, r, placeholderKey, index, components, config, logger, options)),
                            createRenderingFromHtml(html.bodyHtml, renderingContext, r, placeholderKey, index, components, config, logger, options)));
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
    var component = components[componentName] || throwException("Cannot find implementation of '" + componentName + "' React component. Check if it is added to the component map.");
    var placeholderComponent = components.Placeholder || throwException('no components.Placeholder');
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
    return React.createElement(component, Object.assign({}, newProps, originalProps));
}
//# sourceMappingURL=createRendering.js.map