import 'reflect-metadata'
import {TAGS} from '../constants'

const register = (method: string) => (path:string = '') => (
  target: any,
  targetKey: string,
  indexOrPropertyDescriptor: number | TypedPropertyDescriptor<any>
) => {
  if(typeof indexOrPropertyDescriptor !== 'number') {
    // 定义路由信息 
    const metadata = Reflect.getMetadata(TAGS.ROUTE_PATH, target.constructor) || []
    metadata.push({
      method,
      path,
      handler: targetKey
    })
    Reflect.defineMetadata(TAGS.ROUTE_PATH, metadata, target.constructor)
  }
}

export const Get = register('get') 