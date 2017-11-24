const router = require('koa-router')()

router.get('/', async(ctx, next) => {
  await ctx.render('index', {
    title: '你是谁？你来自哪里？你要到哪里去？'
  })
})

module.exports = router