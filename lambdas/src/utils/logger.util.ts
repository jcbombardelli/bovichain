import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.json({ space: 2 }),
  transports: [new transports.Console()]
});

export default logger;