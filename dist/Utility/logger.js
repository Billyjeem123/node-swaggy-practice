"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utils/logger.ts
const winston_1 = require("winston");
const fs = require("fs");
const path = require("path");
// Ensure log directory exists
const logDir = 'src/storage/logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}
const logger = (0, winston_1.createLogger)({
    level: 'debug', // logs everything from debug and above
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)),
    transports: [
        new winston_1.transports.File({
            filename: path.join(logDir, 'log.log'),
        }),
    ],
});
exports.default = logger;
