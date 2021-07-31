import { UniformUnsubscribe, UniformCallback } from './subscriptions';
import { UniformEvent } from './index';
/**
 * First-in first-out data structure that can notify
 * subscribers when new entries are added.
 *
 * An example of where the queue is used is in
 * personalization and tracking. When personalization
 * runs, the tracker may not yet be initialized, but
 * personalization may result in trackable activity.
 * Personalization can add its activity to the queue.
 * When the tracker is available, it can look in the
 * queue for any activity that was created before it
 * was initialized.
 */
export interface UniformQueue {
    add(type: string, entry: any): void;
    get(type: string): any;
    count(type: string): number;
    subscribe(type: string, callback: UniformCallback<QueueEvent>): UniformUnsubscribe;
}
/**
 * Event that is published when an entry is added to a queue.
 */
export interface QueueEvent extends UniformEvent {
    entry: any;
}
/**
 * Gets a new queue object.
 */
export declare function getUniformQueue(): UniformQueue;
//# sourceMappingURL=queue.d.ts.map