import 'reflect-metadata'
import path from "path";
import Router from "koa-router";
import {validate} from 'class-validator'
import {plainToClass} from 'class-transformer'
import '../models/user'
import '../services/user'
import container from "../container";
import Home from "../controllers/home";
import User from '../controllers/user'
import { ROUTE_PARAMS_SOURCE, TAGS } from "../constants";

const router = new Router();
const controllers = [Home, User];

controllers.forEach((Ctrl) => {
  const inst = container.get(Ctrl.name);
  const routePrefixMeta = Reflect.getMetadata(TAGS.ROUTE_PREFIX, Ctrl);
  const routePathMeta = Reflect.getMetadata(TAGS.ROUTE_PATH, Ctrl);
  
  routePathMeta.forEach(({ method, path: p, handler }) => {
    // 注册路由
    router[method](path.join(routePrefixMeta, p), async (ctx) => {
      // 参数元信息
      const routeParamsMeta = Reflect.getMetadata(TAGS.ROUTE_PARAMS, Ctrl, handler) || []
      // 参数类型信息
      const routeParamsTypes = Reflect.getMetadata(TAGS.ROUTE_PARAMS_TYPE, inst, handler)
      // 模版信息
      const renderTemplate = Reflect.getMetadata(TAGS.RENDER_TEMPLATE, Ctrl, handler)
      const data = await inst[handler](...(await Promise.all(routeParamsMeta.map(
        // 获取参数
        async ({name, type}, index) => {
          let params

          switch(type) {
            case ROUTE_PARAMS_SOURCE.QUERY:
              params = ctx.query
              break
            case ROUTE_PARAMS_SOURCE.BODY:
              params = ctx.request.body
          }
          // 普通对象转为 DTO 的实例对象
          const entity = plainToClass(routeParamsTypes[0], name ? params[name] : params)

          // 校验参数
          const errors = await validate(entity)
          if(errors.length) {
            throw new Error(Object.values(errors[0].constraints).join(','))
          }
          
          return entity
        }
      ))));

      if(renderTemplate) {
        return ctx.render(renderTemplate, data)
      }

      ctx.body = data
    });
  });
});

export default router;
