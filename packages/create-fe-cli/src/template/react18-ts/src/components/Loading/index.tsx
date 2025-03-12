import type { FC, ReactNode } from "react";
import { memo } from "react";
interface Iprops {
  children?: ReactNode;
}

const Loading: FC<Iprops> = () => {
  return <>Loading...</>;
};

// 使用memo组件，防止props没变化时也渲染
export default memo(Loading);
