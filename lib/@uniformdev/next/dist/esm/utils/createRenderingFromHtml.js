import React from 'react';
import { throwException } from '@uniformdev/common';
import { getDefaultProcessingInstructions } from '.';
var HtmlToReact = require('html-to-react');
var HtmlToReactParser = require('html-to-react').Parser;
var preprocessingInstructions = [
    {
        shouldPreprocessNode: function (node) {
            return (node.name === 'a' &&
                node.attribs &&
                node.attribs.href &&
                !node.attribs.href.startsWith('#') &&
                !node.attribs.href.startsWith('mailto:') &&
                !node.attribs.href.startsWith('http'));
        },
        preprocessNode: function (node) {
            var href = node.attribs && node.attribs.href;
            // just to make sure we only match relative urls
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                // this will only match relative urls
                var url = new URL(href, 'http://localhost');
                var pathname = url.pathname, search = url.search;
                // appending trailing slash
                if (pathname.substr(-1) != '/')
                    pathname += '/';
                // lowercasing only the pathname
                node.attribs.href = "" + pathname.toLowerCase() + (search ? search : '');
            }
        },
    },
    {
        shouldPreprocessNode: function (node) {
            return node.name === 'meta' && node.attribs && node.attribs.property === 'og:url';
        },
        preprocessNode: function (node) {
            //console.log("processing og:url");
            var urlEnvVar = process.env.URL;
            if (!urlEnvVar) {
                // console.log(
                //   "process.env.URL is undefined, no url replacement will take place"
                // );
                return;
            }
            var processUrl = function (url) {
                if (url && url.substr(-1) != '/')
                    url += '/';
                return url.toLowerCase();
            };
            var content = node.attribs && node.attribs.content;
            if (content) {
                var originalUrl = new URL(content);
                //console.log({originalUrl});
                var newUrl = new URL(urlEnvVar);
                //console.log({newUrl});
                // making sure the relative path is carried over
                newUrl.pathname = originalUrl.pathname;
                //console.log({newUrl});
                node.attribs.content = processUrl(newUrl.href);
            }
            else {
                node.attribs.content = processUrl(new URL(urlEnvVar).href);
            }
            //console.log("og:url: " + node.attribs.content);
        },
    },
    {
        shouldPreprocessNode: function (node) {
            return (node.name === 'link' &&
                node.attribs &&
                node.attribs.rel &&
                node.attribs.rel.toLowerCase() === 'canonical');
        },
        preprocessNode: function (node) {
            //console.log("processing og:url");
            var urlEnvVar = process.env.URL;
            if (!urlEnvVar) {
                // console.log(
                //   "process.env.URL is undefined, no url replacement will take place"
                // );
                return;
            }
            var processUrl = function (url) {
                if (url && url.substr(-1) != '/')
                    url += '/';
                return url.toLowerCase();
            };
            var href = node.attribs && node.attribs.href;
            if (href) {
                var originalUrl = new URL(href);
                //console.log({originalUrl});
                var newUrl = new URL(urlEnvVar);
                //console.log({newUrl});
                // making sure the relative path is carried over
                newUrl.pathname = originalUrl.pathname;
                //console.log({newUrl});
                node.attribs.href = processUrl(newUrl.href);
            }
            else {
                node.attribs.href = processUrl(new URL(urlEnvVar).href);
            }
            //console.log('canonical: ' + node.attribs.href);
        },
    },
];
//@ts-ignore
export function createRenderingFromHtml(html, renderingContext, r, placeholderKey, index, components, _config, logger, options) {
    var _a;
    logger.debug('Rendering component ' + r.componentName + ' from html in ' + placeholderKey + ' placeholder');
    var placeholderComponent = components.Placeholder || throwException('no components.Placeholder');
    // TODO: xml tag before <svg /> breaks pasing.
    // more replacements may be needed and refactored into a replacement function
    var cleanedupHtml = html.replace('<?xml version="1.0" encoding="utf-8"?><svg', '<svg');
    var processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    var processingInstructions = undefined || ((_a = options === null || options === void 0 ? void 0 : options.mvc) === null || _a === void 0 ? void 0 : _a.getProcessingInstructions(processNodeDefinitions.processDefaultNode, placeholderComponent, r, index, placeholderKey, renderingContext, logger)) ||
        getDefaultProcessingInstructions(processNodeDefinitions.processDefaultNode, placeholderComponent, r, index, placeholderKey, renderingContext, logger) ||
        throwException('processingInstructions');
    var rendered = new HtmlToReactParser().parseWithInstructions(cleanedupHtml, function () { return true; }, processingInstructions, preprocessingInstructions);
    logger.debug('Rendering component ' + r.componentName + ' from html');
    return rendered;
}
//# sourceMappingURL=createRenderingFromHtml.js.map