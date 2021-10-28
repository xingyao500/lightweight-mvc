import "reflect-metadata";
import { TAGS } from "../constants";

export const Render =
  (name: string = "index") =>
  (
    target: any,
    targetKey: string,
    indexOrPropertyDescriptor: number | TypedPropertyDescriptor<any>
  ) => {
    if (typeof indexOrPropertyDescriptor !== "number") {
      // 定义渲染信息
      Reflect.defineMetadata(
        TAGS.RENDER_TEMPLATE,
        name,
        target.constructor,
        targetKey
      );
    }
  };
