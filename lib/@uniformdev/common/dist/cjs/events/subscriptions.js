"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionManager = void 0;
function getSubscriptionManager(isGlobal) {
    return new DefaultSubscriptionManager(isGlobal);
}
exports.getSubscriptionManager = getSubscriptionManager;
var DefaultSubscriptionManager = /** @class */ (function () {
    function DefaultSubscriptionManager(isGlobal) {
        if (isGlobal === void 0) { isGlobal = false; }
        this.allEvents = [];
        this.isGlobal = isGlobal;
        this.map = new Map();
        this.publish = this.publish.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }
    DefaultSubscriptionManager.prototype.subscribe = function (type, callback) {
        var callbacks = this.map.get(type);
        if (!callbacks) {
            callbacks = [];
            this.map.set(type, callbacks);
        }
        if (callbacks.indexOf(callback) == -1) {
            callbacks.push(callback);
            this.map.set(type, callbacks);
        }
        return function () {
            var position = callbacks.indexOf(callback);
            if (position == -1) {
                return false;
            }
            callbacks.splice(position, 1);
            return true;
        };
    };
    DefaultSubscriptionManager.prototype.publish = function (data) {
        var _a;
        var callbacks = this.map.get(data.type);
        if (callbacks) {
            callbacks.forEach(function (callback) { return callback(data); });
        }
        var callbacks2 = this.map.get(undefined);
        if (callbacks2) {
            callbacks2.forEach(function (callback) { return callback(data); });
        }
        if (this.isGlobal != true) {
            if ((_a = window.uniform) === null || _a === void 0 ? void 0 : _a.subscriptions) {
                window.uniform.subscriptions.publish(data);
            }
        }
    };
    return DefaultSubscriptionManager;
}());
//# sourceMappingURL=subscriptions.js.map