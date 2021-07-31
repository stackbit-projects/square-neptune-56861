"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvEx = exports.getBoolEnv = exports.getEnv = void 0;
var __1 = require("..");
function getEnv(env, name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    return getEnvEx(env[name], name, defaultValue);
}
exports.getEnv = getEnv;
function getBoolEnv(env, name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    var value = env[name];
    if (value === undefined) {
        return defaultValue === undefined
            ? __1.throwException("FATAL .env file lacks " + name + " bool value")
            : defaultValue;
    }
    value = value.toString().trim().toLowerCase();
    return value === 'true' || value === '1' || value === 'yes';
}
exports.getBoolEnv = getBoolEnv;
function getEnvEx(value, name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    if (value === undefined) {
        return defaultValue === undefined
            ? __1.throwException("FATAL .env file lacks " + name + " value")
            : defaultValue;
    }
    if (Object.prototype.toString.call(value) === '[object String]') {
        return value.trim();
    }
    return value;
}
exports.getEnvEx = getEnvEx;
//# sourceMappingURL=getEnv.js.map