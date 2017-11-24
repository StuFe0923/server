const isDebug = process.env.NODE_ENV === 'development';
const logger = require('../logger')

module.exports = async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    err = err || new Error('Null or undefined error');
    ctx.set('Cache-Control', 'no-cache, max-age=0');
    ctx.status = err.status || 500;
    ctx.type = 'application/json';

    ctx.body = {
      code: err.code,
      error: err.error,
      msg: err.message,
    };
    logger.error(err.stack);
    if (isDebug) {
      ctx.body.stack = err.stack;
    }
  }
};