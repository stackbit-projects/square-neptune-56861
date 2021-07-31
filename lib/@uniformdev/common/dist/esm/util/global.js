import { getSubscriptionManager } from '../events/subscriptions';
import { getUniformQueue } from '../events/queue';
export function initializeGlobalObject() {
    if (window) {
        if (!window.uniform) {
            window.uniform = {};
        }
        if (!window.uniform.subscriptions) {
            window.uniform.subscriptions = getSubscriptionManager(true);
        }
        if (!window.uniform.queue) {
            window.uniform.queue = getUniformQueue();
        }
    }
}
//# sourceMappingURL=global.js.map