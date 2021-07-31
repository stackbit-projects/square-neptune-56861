"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverLogger = void 0;
var _a = require('winston'), createLogger = _a.createLogger, format = _a.format, transports = _a.transports;
var getBoolEnv = require('@uniformdev/common').getBoolEnv;
var combine = format.combine, timestamp = format.timestamp, colorize = format.colorize, printf = format.printf;
function paddy(text, padlen) {
    if (padlen <= text.length)
        return text;
    return ' '.repeat(padlen - text.length) + text;
}
var loggerTransports = [];
var isDebug = getBoolEnv(process.env, 'UNIFORM_OPTIONS_DEBUG', false);
var consoleTransport = new transports.Console({
    level: isDebug ? 'debug' : 'info',
    format: combine(timestamp({ format: 'MM/dd-HH:mm:ss' }), colorize({ all: true, colors: { debug: 'grey' } }), printf(function (info) {
        var timestamp = info.timestamp, level = info.level, message = info.message, args = __rest(info, ["timestamp", "level", "message"]);
        // const ts = timestamp.slice(0, 19).replace('T', ' ');
        var lvl = paddy(level, 'debug'.length + 10); // 10 is for color special chars
        return timestamp + " " + lvl + ": " + message + " " + (Object.keys(args).length ? JSON.stringify(args, null, 2) : '');
    })),
});
loggerTransports.push(consoleTransport);
if (typeof window === 'undefined' && isDebug) {
    var fileTransport = new transports.File({ filename: '.debug.log', level: 'debug' });
    loggerTransports.push(fileTransport);
}
exports.serverLogger = createLogger({
    transports: loggerTransports,
});
if (isDebug) {
    exports.serverLogger.debug('Logging initialized at debug level');
}
//# sourceMappingURL=serverLogger.js.map