"use strict";
import { Command } from "commander";
import { PKG_VERSION } from "./utils/choosePlugin/constants";
import init from "./action/init";
import process from "process";
// 对于可能以多种方式使用 commander 的大型程序（包括单元测试），最好创建一个本地 Command 对象来使用
const program = new Command();
program
  .version(PKG_VERSION, "-v, --version", "output the version number")
  .description("create-fe-cli");

program
  .command("init")
  .description("初始化项目模板")
  .action(async () => {
    await init();
  });
process.on("SIGINT", () => {
  console.warn("程序被中断");
  process.exit();
});
program.parse(process.argv);
