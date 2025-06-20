// utils/logger.ts
import { createLogger, transports, format } from 'winston';
import * as fs from 'fs';
import * as path from 'path';

// 🔐 Ensure log directory exists
const logDir = 'src/storage/logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [
    new transports.File({ filename: path.join(logDir, 'log.log'), level: 'error' }),
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
  ],
});

// Log to console in non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: format.simple() }));
}

export default logger;
