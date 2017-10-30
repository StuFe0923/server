const router = require('koa-router')()

const db = require('../db')
const User = require('../model/user');

router.prefix('/users')

router.get('/', async function (ctx, next) {
  let ret;
  try {
    let users = await User.find();
    // console.log(users)
    ret = {
      code: 0,
      data: users
    }

  } catch (error) {

    ret = {
      code: -1,
      error: error.message,
      stack: error.stack
    }
    ctx.status = 500
  } finally {
    ctx.body = ret
  }


})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
