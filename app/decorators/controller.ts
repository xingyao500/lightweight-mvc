import 'reflect-metadata'
import {injectable} from 'inversify'
import {TAGS} from '../constants'
import container from '../container'

export default (prefix: string = '/') => (cls: any) => {
  // 定义 controller 的路径前缀
  Reflect.defineMetadata(TAGS.ROUTE_PREFIX, prefix, cls)

  // 向 ioc 容器注册
  injectable()(cls)
  container.bind(cls.name).to(cls)
}