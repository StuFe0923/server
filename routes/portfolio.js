const router = require('koa-router')();
const Promise = require("bluebird");
const utils = require('../utils');
const config = require('../config');
const rp = require('request-promise');

const hosts = config.hosts;

router.prefix('/portfolio')

router.get('/*', async (ctx, next) => {
  console.log('portfolio==========')
  let method = ('' + ctx.method).toUpperCase();
  let uri = hosts.portfolio + ctx.path.replace(/^\/portfolio/i, '');
  let headers = {
    'Referer': 'http://zixuanguapp.finance.qq.com'
  };
  let options = {
    method: method,
    uri: uri,
    headers: headers,
    json: true,
  };

  if (method === 'GET') {
    options.qs = ctx.request.query;
  } else {
    options.body = ctx.request.body;
  }

  let resp = await rp(options);
  return ctx.body = resp;
})



module.exports = router