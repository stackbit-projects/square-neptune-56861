var NullLogger = /** @class */ (function () {
    function NullLogger() {
        this.debug = function () { };
        this.error = function () { };
        this.info = function () { };
        this.trace = function () { };
        this.warn = function () { };
    }
    return NullLogger;
}());
var nullLogger = new NullLogger();
export function getNullLogger() {
    return nullLogger;
}
//# sourceMappingURL=Logger.js.map