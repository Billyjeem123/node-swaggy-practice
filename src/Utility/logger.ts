// utils/logger.ts
import { createLogger, format, transports } from 'winston';
import * as fs from 'fs';
import * as path from 'path';

// Ensure log directory exists
const logDir = 'src/storage/logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
  level: 'debug', // logs everything from debug and above
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, 'log.log'),
    }),
  ],
});

export default logger;
