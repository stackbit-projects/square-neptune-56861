"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorToJsonObject = void 0;
var serialize_error_1 = __importDefault(require("serialize-error"));
function errorToJsonObject(error) {
    var obj = serialize_error_1.default(error);
    // @ts-ignore
    var data = error.data;
    if (data) {
        obj.data = data;
    }
    return obj;
}
exports.errorToJsonObject = errorToJsonObject;
//# sourceMappingURL=errorToJsonObject.js.map