import compression from 'compression';
import express from 'express';
var bodyParser = require('body-parser');
export function createServer(logger) {
    logger.info('Express is being activated...');
    var server = express();
    // enable gzip compression
    server.use(compression());
    server.use(bodyParser.json({ limit: '50mb' }));
    return server;
}
//# sourceMappingURL=createServer.js.map