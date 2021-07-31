import { throwException } from '..';
export function getEnv(env, name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    return getEnvEx(env[name], name, defaultValue);
}
export function getBoolEnv(env, name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    var value = env[name];
    if (value === undefined) {
        return defaultValue === undefined
            ? throwException("FATAL .env file lacks " + name + " bool value")
            : defaultValue;
    }
    value = value.toString().trim().toLowerCase();
    return value === 'true' || value === '1' || value === 'yes';
}
export function getEnvEx(value, name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    if (value === undefined) {
        return defaultValue === undefined
            ? throwException("FATAL .env file lacks " + name + " value")
            : defaultValue;
    }
    if (Object.prototype.toString.call(value) === '[object String]') {
        return value.trim();
    }
    return value;
}
//# sourceMappingURL=getEnv.js.map