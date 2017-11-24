const log4js = require('log4js');
const process = require('process');
const config = require('./config');
const isDebug = process.env.NODE_ENV === 'development';
const logFile = config.logPath + isDebug ? '.debug.log' : '.log';

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    debug: { type: 'file', filename: logFile },
    app: { type: 'file', filename: logFile }
  },
  categories: {
    app: { appenders: ['app'], level: 'error' },
    default: { appenders: ['out', 'debug'], level: 'debug' }
  }
});

var logger = log4js.getLogger(isDebug ? 'default' : 'app');

logger.connect = async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  let level = log4js.levels.INFO;
  if (ctx.res.statusCode) {
    if (ctx.res.statusCode >= 300) level = levels.WARN
    if (ctx.res.statusCode >= 400) level = levels.ERROR
  }
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

module.exports = logger;