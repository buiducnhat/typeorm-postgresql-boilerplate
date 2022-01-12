import * as winston from 'winston';

import config from '@src/config';
import { RUN_MODE } from '@src/config/constants';

const vietnameseTimeZone = () => {
  return new Date().toLocaleString('vn-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
};

const transports = [];
transports.push(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.cli(), winston.format.splat()),
  }),
);
if (process.env.NODE_ENV === RUN_MODE.prod) {
  transports.push(
    new winston.transports.File({
      level: 'info',
      filename: 'logs/app.log',
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/error.log',
    }),
  );
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: vietnameseTimeZone,
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports,
});

export default LoggerInstance;
