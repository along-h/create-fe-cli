import { sync as commandExistsSync } from "command-exists";
import log from "./log";
import inquirer from "inquirer";

/**
 * npm 类型
 * @description 默认取pnpm，如果没有安装pnpm则取npm
 */
export const existsNpm: Promise<"npm" | "pnpm"> = new Promise((resolve) => {
  if (!commandExistsSync("pnpm")) return resolve("npm");

  resolve("pnpm");
});
/**
 * 检查全局包是否安装
 * @param packageName 包名
 * @returns 是否安装
 */
export const existsGlobalPkg: (packageName: string) => Promise<Boolean> = (packageName) => {
  return new Promise((resolve) => {
    log.info(`检查全局包${packageName}是否安装: ${commandExistsSync(packageName)}`);
    if (!commandExistsSync(packageName)) return resolve(false);
    resolve(true);
  });
};
/**
 * 是否全局安装
 */
export const isInstallGlobalPkg = async (frame: string) => {
  const { enable } = await inquirer.prompt({
    type: "confirm",
    name: "enable",
    message: `是否全局安装${frame}脚手架`,
    default: true
  });
  return enable;
};
