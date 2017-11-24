const router = require('koa-router')()
const random_chinese_name = require('chinese-random-name');
const random_skill = require('chinese-random-skill');
const Promise = require("bluebird");
const utils = require('../utils')

const db = require('../db')
const ArticleModel = require('../model/article');

router.prefix('/articles')

router.get('/list', async(ctx, next) => {
  let fields = '_id title up comment view author publish_time'
  let param = {};
  let query = ctx.query;
  let pageNow = Math.max(query.pageNow || 0, 0);
  let pageCount = Math.max(query.pageCount || 2, 1);
  if (query.title) {
    param.title = new RegExp(query.title, 'i');
  }
  let options = {
    skip: pageNow * pageCount,
    limit: pageCount
  }

  let count = await ArticleModel.count(param)
  let articles = await ArticleModel.find(param, fields, options).exec()
  let pages = {
    pageNumber: Math.ceil(count / pageCount),
    pageCount: pageCount,
    pageNow: pageNow,
    count: count
  };


  utils.resSuccess(ctx, articles, { pages: pages });

})

router.get('/up', async(ctx, next) => {
  let id = ctx.query.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return utils.resError(400, 'ID_INVALID');
  }

  await ArticleModel.findByIdAndUpdate(id, { $inc: { up: 1 } }).exec()
  let c = await ArticleModel.findById(id).exec();
  if (c) {
    return utils.resSuccess(ctx, c);
  } else {
    return utils.resError(400, 'DATA_NOT_FOUND');
  }

})

router.get('/del', async(ctx, next) => {
  let id = ctx.query.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return utils.resError(400, 'ID_INVALID');
  }

  let c = await ArticleModel.findByIdAndRemove(id).exec()
  if (c) {
    return utils.resSuccess(ctx, c);
  } else {
    return utils.resError(400, 'DATA_NOT_FOUND');
  }

})

router.get('/add', async(ctx, next) => {
  let title = ctx.query.title;
  let author = ctx.query.author;
  if (!title || !author) {
    return utils.resError(400, 'PARAMS_ERROR');
  }
  let article = new ArticleModel({
    title: title,
    author: author,
    comment: 0,
    view: 0,
    up: 0,
    publish_time: new Date()
  })
  await article.save()
  return utils.resSuccess(ctx);
})

router.get('/add/random', async(ctx, next) => {
  let count = ctx.query.count || 1;
  count = Math.min(count, 10);
  let items = [];
  for (let index = 0; index < count; index++) {
    let article = new ArticleModel({
      title: random_skill.generate(),
      author: random_chinese_name.generate(),
      comment: 0,
      view: 0,
      up: 0,
      publish_time: new Date()
    });
    items.push(article.save())
  }
  await Promise.all(items)
  return utils.resSuccess(ctx);
})

module.exports = router