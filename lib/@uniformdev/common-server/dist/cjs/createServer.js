"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var compression_1 = __importDefault(require("compression"));
var express_1 = __importDefault(require("express"));
var bodyParser = require('body-parser');
function createServer(logger) {
    logger.info('Express is being activated...');
    var server = express_1.default();
    // enable gzip compression
    server.use(compression_1.default());
    server.use(bodyParser.json({ limit: '50mb' }));
    return server;
}
exports.createServer = createServer;
//# sourceMappingURL=createServer.js.map