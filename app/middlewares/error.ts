import {Middleware} from 'koa'

export default ():Middleware => async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    ctx.body = err.stack
  }
}