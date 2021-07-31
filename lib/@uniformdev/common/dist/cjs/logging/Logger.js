"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNullLogger = void 0;
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
function getNullLogger() {
    return nullLogger;
}
exports.getNullLogger = getNullLogger;
//# sourceMappingURL=Logger.js.map