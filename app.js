const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('./logger');
const cors = require('koa2-cors')
const convert = require('koa-convert')
const error = require('./middleware/error')

const index = require('./routes/index')
const users = require('./routes/users')
const articles = require('./routes/articles')
const portfolio = require('./routes/portfolio')

// error handler
// onerror(app)
app.use(error)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// static files
app.use(convert(require('koa-static')(__dirname + '/public')))
app.use(cors())

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())
app.use(portfolio.routes(), articles.allowedMethods())


module.exports = app
