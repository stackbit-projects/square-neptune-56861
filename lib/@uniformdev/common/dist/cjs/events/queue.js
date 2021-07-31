"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniformQueue = void 0;
var subscriptions_1 = require("./subscriptions");
/**
 * Gets a new queue object.
 */
function getUniformQueue() {
    var map = new Map();
    var subscriptions = subscriptions_1.getSubscriptionManager();
    return {
        add: function (type, entry) {
            var _a;
            var values = (_a = map.get(type)) !== null && _a !== void 0 ? _a : [];
            if (values.indexOf(entry) == -1) {
                values === null || values === void 0 ? void 0 : values.push(entry);
                subscriptions.publish({
                    type: type,
                    when: new Date(),
                    entry: entry
                });
            }
            map.set(type, values);
        },
        get: function (type) {
            var values = map.get(type);
            if (!values) {
                return undefined;
            }
            return values.shift();
        },
        count: function (type) {
            var values = map.get(type);
            if (!values) {
                return 0;
            }
            return values.length;
        },
        subscribe: function (type, callback) {
            return subscriptions.subscribe(type, callback);
        }
    };
}
exports.getUniformQueue = getUniformQueue;
//# sourceMappingURL=queue.js.map