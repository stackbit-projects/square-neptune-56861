import { getSubscriptionManager } from './subscriptions';
/**
 * Gets a new queue object.
 */
export function getUniformQueue() {
    var map = new Map();
    var subscriptions = getSubscriptionManager();
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
//# sourceMappingURL=queue.js.map