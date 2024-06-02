import { LoggerOptions, createLogger, format, transports } from 'winston';

const options = {
  file: {
    filename: 'error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
  },
};

const logger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.Console(options.console),
    new transports.File(options.file),
  ],
} as LoggerOptions;

export const winstonLoggerInstance = createLogger(logger);
