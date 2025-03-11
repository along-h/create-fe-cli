import inquirer from "inquirer";
import { VUE_CHECK_TYPES, REACT_CHECK_TYPES, TFrameType } from "./constants";
import { ICheckItem } from "./type";
import chooseReactStore from "./chooseReactStore";
let step = 0;
/**
 * 选择项目的检查项
 * @returns {Promise<Array>}
 */
export default async (frameType: TFrameType): Promise<ICheckItem[]> => {
  const CHECK_TYPES = frameType === "vue" ? VUE_CHECK_TYPES : REACT_CHECK_TYPES;
  const checkList: ICheckItem[] = [];
  for (let i = 0; i < CHECK_TYPES.length; i++) {
    const { enable } = await inquirer.prompt({
      type: "confirm",
      name: "enable",
      message: `Step ${++step}. ${CHECK_TYPES[i].name}`,
      default: true
    });
    checkList.push({
      type: CHECK_TYPES[i].type,
      value: enable
    });
  }
  if (frameType === "react") {
    // 选择状态管理工具
    const reactStore = await chooseReactStore(++step);
    checkList.push({
      type: reactStore,
      value: true
    });
  }
  return checkList;
};
