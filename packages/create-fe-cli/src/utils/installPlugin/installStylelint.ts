/**
 * 安装stylelint
 */

import ora from "ora";
import path from "path";
import { wiritePkgByPkg } from "../writeFile";
import { ItemType } from "../choosePlugin/type";
import { copyFilesSync } from "../copyeFiles";
const configMap: Record<ItemType, string> = {
  // hasPrettier: 'stylelint-config-prettier',
  hasLess: "stylelint-config-standard-less",
  hasSass: "stylelint-config-standard-scss",
  hasStylus: "stylelint-config-standard-stylus"
};
export default async () => {
  const loading = ora("开始安装stylelint");
  loading.start();
  // 写入package.json
  await wiritePkgByPkg(path.resolve(path.join(__dirname, "../../config/stylelint/package.json")));
  // 复制prettier配置文件
  copyFilesSync(
    [
      path.resolve(path.join(__dirname, "../../config/stylelint/.stylelintignore")),
      path.resolve(path.join(__dirname, "../../config/stylelint/stylelint.json"))
    ],
    [process.cwd() + "/.stylelintignore", process.cwd() + "/stylelint.json"]
  );
  loading.succeed("配置stylelint完成");
};
