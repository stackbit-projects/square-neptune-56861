import serializeError from 'serialize-error';
export function errorToJsonObject(error) {
    var obj = serializeError(error);
    // @ts-ignore
    var data = error.data;
    if (data) {
        obj.data = data;
    }
    return obj;
}
//# sourceMappingURL=errorToJsonObject.js.map