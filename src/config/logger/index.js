import winston from 'winston';
import { Papertrail } from 'winston-papertrail';
import fse from 'fs-extra';
import config from '../setup';

const wslogger = winston.createLogger({
  transports: [
    new Papertrail({
      host: config.PAPERTRAIL_HOST,
      port: config.PAPERTRAIL_PORT,
    }),
  ],
});

const log = (value, type, location) => {
  if (config.DEBUG === 'true') {
    const formatMessage = `${new Date().toGMTString()} [${type}]: ${value}::${location}`;
    return formatMessage;
  }
  return '';
};

const logger = {
  info: (value, location = '') => {
    if (config.DEBUG === 'true') {
      const infoLog = './error.log';
      if (!fse.existsSync(infoLog)) {
        fse.writeFileSync(infoLog, 'utf-8');
      }
      const logs = fse.readFileSync(infoLog, 'utf-8');
      const logString = log(value, 'INFO', location);
      const write = `${logs}${logString} \n`;
      fse.outputFileSync(infoLog, write);
      wslogger.info(logString);
      if (config.NODE_ENV === 'development') {
        console.log(log(value, 'INFO', location));
      }
    }
  },
  error: (value, location = '') => {
    if (config.DEBUG === 'true') {
      const errorLog = './error.log';
      if (!fse.existsSync(errorLog)) {
        fse.writeFileSync(errorLog, 'utf-8');
      }
      const logs = fse.readFileSync(errorLog, 'utf-8');
      const logString = log(value, 'ERROR', location);
      const write = `${logs}${logString} \n`;
      fse.outputFileSync(errorLog, write);
      wslogger.error(logString);
      if (config.NODE_ENV === 'development') {
        console.log(log(value, 'ERROR', location));
      }
    }
  },
  log: (value, location = '') => {
    if (config.DEBUG === 'true') {
      const serverLog = './server.log';
      if (!fse.existsSync(serverLog)) {
        fse.writeFileSync(serverLog, 'utf-8');
      }
      const logs = fse.readFileSync(serverLog, 'utf-8');
      const logString = log(value, 'LOG', location);
      const write = `${logs}${logString} \n`;
      fse.outputFileSync(serverLog, write);
      wslogger.info(logString);
      if (config.NODE_ENV === 'development') {
        console.log(log(value, 'LOG', location));
      }
    }
  },
};

export { logger };
