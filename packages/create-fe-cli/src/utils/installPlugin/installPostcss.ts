import ora from "ora";
import { wiritePkgByPkg } from "../writeFile";
import path from "path";
import { copyFilesSync } from "../copyeFiles";
import { readFileSync, writeFileSync } from "fs-extra";

export default async (hasTailwindcss: boolean) => {
  const loading = ora("开始载入postcss...");
  loading.start();
  // 写入package.json
  await wiritePkgByPkg(path.resolve(path.join(__dirname, "../../config/postcss/package.json")));
  const configPath = hasTailwindcss ? "tailwindcss.config.js" : "postcss.config.js";
  // 复制prettier配置文件
  copyFilesSync(
    path.resolve(path.join(__dirname, `../../config/postcss/${configPath}`)),
    process.cwd() + "/postcss.config.js"
  );
  loading.succeed("postcss加载完成");
};
