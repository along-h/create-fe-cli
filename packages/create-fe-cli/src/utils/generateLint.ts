import { TFrameType } from "./choosePlugin/constants";
import {
  installCommitlint,
  installPrettier,
  installStylelint,
  installPostcss,
  installTailwindcss
} from "./installPlugin";
import installRedux from "./installPlugin/installRedux";
import { ICheckItem } from "./choosePlugin/type";

/**
 * 注入各项校验文件
 * @description: 生成lint文件
 * @param {TFrameType} frameType - 项目类型
 * @param {ICheckItem[]} checkList - 项目配置项
 * @param {"template" | "cli"} installType - 安装类型
 */
export default async (
  frameType: TFrameType,
  checkList: ICheckItem[],
  installType: "template" | "cli"
) => {
  for (const item of checkList) {
    if (item.value) {
      switch (item.type) {
        case "tailwindcss":
          await installTailwindcss(frameType, installType);
          break;
        case "markdownlint":
          break;
        case "prettier":
          await installPrettier();
          break;
        case "stylelint":
          await installStylelint();
          break;
        case "commitlint":
          await installCommitlint();
          break;
        case "postcss":
          const hasTailwindcss = checkList.find((item) => item.type === "tailwindcss")?.value;
          await installPostcss(hasTailwindcss as any as boolean);
          break;
        case "Redux":
          await installRedux(installType);
          break;
        default:
          break;
      }
    }
  }
};
