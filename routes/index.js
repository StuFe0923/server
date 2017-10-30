const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: 'your request is ok!'
  }
})

router.get('/list', async (ctx, next) => {
  let list = [
    {
      title: '如果你是新手，请务必先看完本项目的视频教程',
      view: 10000,
      comment: 2000,
      good: 333,
      author: '谭林',
      time: '2017-10-23 11:20:30'
    },
    {
      title: '只有看完视频教程，你才能完整理解Angular的核心特性和NiceFish这个项目的结构',
      view: 300,
      comment: 2300,
      good: 13,
      author: '谭林',
      time: '2017-10-23 09:10:30'
    }
  ];
  ctx.body = {
    code: 0,
    msg: 'success',
    data: list
  }
})


router.post('/login', async (ctx, next) => {
  var req = ctx.request;
  var username = req.body.username;
  var password = req.body.password;
  if (username === 'admin' && password === '123') {
    ctx.body = {
      code: 0,
      msg: 'success',
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'login fail:username or password error',
    }
  }

})

module.exports = router
