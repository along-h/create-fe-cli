import installFrame from "../utils/installPlugin/installFrame";
import chooseFrameType from "../utils/choosePlugin/chooseFrameType";
import log from "../utils/log";
import { exit } from "process";
export default async () => {
  try {
    log.time("执行耗时");
    // 选择框架类型和项目名称
    const { frameType, name } = await chooseFrameType();
    // // 选择语言框架
    await installFrame(frameType, name);
    log.timeEnd("执行耗时");
  } catch (error) {
    exit();
  }
};
