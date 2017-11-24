const RETCODE = require('./codes');
const createError = require('http-errors');

function resSuccess(ctx, result, extra = null, msg = 'success') {
  let ret = {
    code: 0,
    msg: msg,
    data: result
  }
  if (extra) {
    ret = Object.assign({}, ret, extra);
  }
  ctx.body = ret;
}

function resError(status, msg, code, error) {
  status = parseInt(status, 10);
  let ret = RETCODE[msg || 'UNKNOW_ERROR'];
  if (ret) {
    code = ret.code;
    msg = ret.message;
  }

  let err = createError(status, msg);
  err.code = code;
  err.error = error;
  throw err;

}

module.exports = {
  resSuccess,
  resError
}