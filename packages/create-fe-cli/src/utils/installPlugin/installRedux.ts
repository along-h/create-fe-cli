import ora from "ora";
import { wiritePkgByPkg } from "../writeFile";
import path from "path";
import { copyDirSync } from "../copyeFiles";
import { readFileSync, writeFileSync } from "fs-extra";
import log from "../log";
import hwTemplate from "../../config/redux/index";
import AppTemplate from "../../config/redux/App";
/** 配置redux */
export default async (installType: "template" | "cli") => {
  const loading = ora("开始载入redux...");
  loading.start();
  try {
    // 写入package.json
    await wiritePkgByPkg(path.resolve(path.join(__dirname, "../../config/redux/package.json")));
    // 复制配置文件
    copyDirSync(
      path.resolve(path.join(__dirname, `../../config/redux/store`)),
      process.cwd() + "/src/store"
    );
    if (installType === "template") {
      // 替换App.tsx
      const appTsxPath = path.resolve(process.cwd() + "/src/App.tsx");
      await writeFileSync(appTsxPath, AppTemplate);
      // 替换hello-world页面
      const hWPagePath = path.resolve(process.cwd() + "/src/pages/hello-world/index.tsx");
      await writeFileSync(hWPagePath, hwTemplate);
    }
    loading.succeed("redux 安装成功！");
  } catch (error) {
    loading.fail("redux 安装失败！");
    log.error(`redux 安装失败: ${error}`);
  }
};
