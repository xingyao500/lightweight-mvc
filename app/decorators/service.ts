import 'reflect-metadata'
import {injectable} from 'inversify'
import container from '../container'

export default () => (cls: any) => {
  // 向 ioc 容器注册
  injectable()(cls)
  container.bind(cls.name).to(cls)
}