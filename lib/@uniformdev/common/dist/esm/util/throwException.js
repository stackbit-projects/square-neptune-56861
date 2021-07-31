export function throwException(message) {
    // typeof Error returns `object`
    // And for some reason `message instanceof Error` sometimes evaluates
    // to false when message is actually an Error object.
    // So, go with the highly scientific option and check for `object` type and
    // whether or not the `stack` property is defined.
    if (typeof message === 'object' && message.stack) {
        throw message;
    }
    throw new Error(message || 'Unknown error occurred, check stacktrace to get more info.');
}
//# sourceMappingURL=throwException.js.map