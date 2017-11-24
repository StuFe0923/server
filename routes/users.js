const router = require('koa-router')()
const random_chinese_name = require('chinese-random-name');
const Promise = require("bluebird");
const utils = require('../utils');

const db = require('../db')
const User = require('../model/user');

router.prefix('/users')


router.post('/login', async(ctx, next) => {
  var body = ctx.request.body;
  var username = body.username;
  var password = body.password;
  if (!username || !password) {
    return utils.resError(403, 'PARAMS_ERROR');
  }
  let users = await User.find({
    username: username,
    password: password
  }).exec();
  if (users && users.length) {
    return utils.resSuccess(ctx, users);
  } else {
    return utils.resError(403, 'USER_INVALID');
  }
})

router.get('/list', async(ctx, next) => {
  let fields = 'username password'
  let param = {};
  let query = ctx.query;
  let pageNow = Math.max(query.pageNow || 0, 0);
  let pageCount = Math.max(query.pageCount || 10, 1);
  if (query.username) {
    param.username = query.username;
  }
  let options = {
    skip: pageNow * pageCount,
    limit: pageCount
  }

  let count = await User.count(param)
  let users = await User.find(param, fields, options).exec()
  let pages = {
    pageNumber: Math.ceil(count / pageCount),
    pageCount: pageCount,
    pageNow: pageNow,
    count: count
  }
  utils.resSuccess(ctx, users, { pages: pages });

})

router.get('/del', async(ctx, next) => {
  let username = ctx.query.username;
  if (!username) {
    return utils.resError(500, 'USERNAME_IS_NULL');
  }

  let c = await User.find({ username: username }).remove().exec()
  if (c.result.n > 0) {
    return utils.resSuccess(ctx, c.result);
  } else {
    return utils.resError(400, 'USERNAME_NOT_FOUND');
  }

})

router.post('/regist', async(ctx, next) => {
  let data = ctx.request.body;
  let username = data.username;
  let password = data.password;
  if (!username || !password) {
    return utils.resError(400, 'USERNAME_PWD_IS_NULL');
  }
  if (!/^[_A-Za-z0-9]{6,10}$/g.test(username)) {
    return utils.resError(400, 'USERNAME_INVALID');
  }
  let users = await User.find({
    username: username,
  }).exec();
  if (users && users.length) {
    return utils.resError(400, 'USERNAME_EXIST');
  }
  let user = new User({
    username: username,
    password: password
  })
  await user.save()
  return utils.resSuccess(ctx);
})

router.get('/add/random', async(ctx, next) => {
  let count = ctx.query.count || 1;
  count = Math.min(count, 10);
  let items = [];
  for (let index = 0; index < count; index++) {
    let user = new User({
      username: random_chinese_name.generate(),
      password: '123123'
    });
    items.push(user.save())
  }
  try {
    await Promise.all(items)
    return utils.resSuccess(ctx);
  } catch (error) {
    return utils.resError(500);
  }
})

module.exports = router