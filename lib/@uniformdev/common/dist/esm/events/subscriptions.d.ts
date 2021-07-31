import { UniformEvent } from './index';
export interface UniformUnsubscribe {
    (): boolean;
}
export interface UniformCallback<T> {
    (data: T): void;
}
export declare function getSubscriptionManager<TData extends UniformEvent | UniformEvent>(isGlobal?: boolean): SubscriptionManager<TData>;
export interface SubscriptionManager<TData extends UniformEvent | UniformEvent> {
    /**
     * Add a callback that runs when a specific event type is published.
     * @param type
     * @param callback
     */
    subscribe(type: string | undefined, callback: UniformCallback<TData>): UniformUnsubscribe;
    /**
     * Publish an event to all subscribers for the event type.
     * @param type
     * @param data
     */
    publish(data: TData): void;
}
//# sourceMappingURL=subscriptions.d.ts.map