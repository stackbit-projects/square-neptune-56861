"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeGlobalObject = void 0;
var subscriptions_1 = require("../events/subscriptions");
var queue_1 = require("../events/queue");
function initializeGlobalObject() {
    if (window) {
        if (!window.uniform) {
            window.uniform = {};
        }
        if (!window.uniform.subscriptions) {
            window.uniform.subscriptions = subscriptions_1.getSubscriptionManager(true);
        }
        if (!window.uniform.queue) {
            window.uniform.queue = queue_1.getUniformQueue();
        }
    }
}
exports.initializeGlobalObject = initializeGlobalObject;
//# sourceMappingURL=global.js.map