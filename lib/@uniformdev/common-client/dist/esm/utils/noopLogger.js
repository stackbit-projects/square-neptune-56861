// parameter name prefixed with `_` to make TS stop complaining about unused parameters.
export var noopLogger = {
    debug: function () {
        var _msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _msg[_i] = arguments[_i];
        }
    },
    info: function () {
        var _msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _msg[_i] = arguments[_i];
        }
    },
    warn: function () {
        var _msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _msg[_i] = arguments[_i];
        }
    },
    error: function () {
        var _msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _msg[_i] = arguments[_i];
        }
    },
};
//# sourceMappingURL=noopLogger.js.map