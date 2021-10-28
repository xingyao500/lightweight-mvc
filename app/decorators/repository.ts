import "reflect-metadata";
import { getRepository } from "typeorm";
import container from "../container";

export default (name: string) => (cls: any) => {
  // 向 ioc 容器注册
  container.bind(name).toFactory(() => () => {
    return getRepository(cls);
  });
};
