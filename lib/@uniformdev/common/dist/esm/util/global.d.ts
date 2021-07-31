import { SubscriptionManager } from '../events/subscriptions';
import { UniformEvent } from '../events/index';
import { UniformQueue } from '../events/queue';
export interface UniformWindow extends Window {
    uniform?: UniformGlobal;
}
export interface UniformGlobal {
    /**
     * Set the event type to undefined in order to subscribe to all events.
     */
    subscriptions?: SubscriptionManager<UniformEvent>;
    queue?: UniformQueue;
}
export declare function initializeGlobalObject(): void;
//# sourceMappingURL=global.d.ts.map