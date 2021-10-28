import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import nunjucks from 'koa-nunjucks-2'
import logger from './middlewares/logger'
import error from './middlewares/error'
import config from './config'
import router from './router'
import connectMysql from './typeorm'

const app = new Koa()

// 注入中间件
app.use(bodyParser())
app.use(logger())
app.use(error())
app.use(nunjucks(config.nunjucks))
app.use(router.routes())
app.use(router.allowedMethods())

// 连接 mysql
connectMysql(config.typeorm)

// 启动服务器
app.listen(config.PORT, () => {
  console.log(`server is running at ${config.PORT}`)
})