const router = require('koa-router')()
const random_name = require('node-random-name');
const Promise = require("bluebird");

const db = require('../db')
const User = require('../model/user');

router.prefix('/users')

router.get('/list', async (ctx, next) => {
  let fields = 'username password'
  let param = {};
  let query = ctx.query;
  let pageNow = Math.max(query.pageNow || 0, 0);
  let pageCount = Math.max(query.pageCount || 2, 1);
  if (query.username) {
    param.username = query.username;
  }
  let options = {
    skip: pageNow * pageCount,
    limit: pageCount
  }


  let ret;
  let count = await User.count(param)
  let users = await User.find(param, fields, options).exec()
  ret = {
    code: 0,
    msg: 'success',
    data: users,
    pages: {
      pageNumber: Math.ceil(count / pageCount),
      pageCount: pageCount,
      pageNow: pageNow,
      count: count
    }
  }
  ctx.body = ret

})

router.get('/del', async (ctx, next) => {
  let username = ctx.query.username;
  console.log(username)
  if (!username) {
    return ctx.body = {
      code: -2,
      msg: '用户名不能为空'
    }
  }

  let c = await User.find({ username: username }).remove().exec()
  if (c.result.n > 0) {
    ctx.body = {
      code: 0,
      data: c.result,
      msg: 'success'
    }
  } else {
    ctx.body = {
      code: -3,
      msg: `用户${username}不存在`
    }
  }

})

router.get('/add', async (ctx, next) => {
  let username = ctx.query.username;
  let password = ctx.query.password;
  if (!username || !password) {
    return ctx.body = {
      code: -1,
      msg: '用户名和密码不能为空'
    }
  }
  let user = new User({
    username: username,
    password: password
  })
  await user.save()
  ctx.body = {
    code: 0,
    msg: 'success'
  }
})

router.get('/add/random', async (ctx, next) => {
  let count = ctx.query.count || 1;
  count = Math.min(count, 10);
  let items = [];
  for (let index = 0; index < count; index++) {
    let user = new User({
      username: random_name(),
      password: '123123'
    });
    items.push(user.save())
  }
  await Promise.all(items)
  ctx.body = {
    code: 0,
    msg: 'success'
  }
})

module.exports = router
