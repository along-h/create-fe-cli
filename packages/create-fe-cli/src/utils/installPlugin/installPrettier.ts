import ora from "ora";
import { wiritePkgByPkg } from "../writeFile";
import { existsSync, readFileSync, writeFileSync } from "fs-extra";
import path from "path";
import { copyFilesSync } from "../copyeFiles";

export default async () => {
  const loading = ora("开始载入prettier...");
  loading.start();
  let pkgPath = "";
  console.log(existsSync(path.join(process.cwd(), "eslint.config.js")));
  if (existsSync(path.join(process.cwd(), "eslint.config.js"))) {
    pkgPath = "../../config/prettier/package.json";
  } else {
    pkgPath = "../../config/prettier/package-noEslint.json";
  }
  // 写入package.json
  await wiritePkgByPkg(path.resolve(path.join(__dirname, pkgPath)));
  // 复制prettier配置文件
  copyFilesSync(
    [
      path.resolve(path.join(__dirname, "../../config/prettier/.prettierignore")),
      path.resolve(path.join(__dirname, "../../config/prettier/prettier.json"))
    ],
    [process.cwd() + "/.prettierignore", process.cwd() + "/prettier.json"]
  );
  // 兼容eslint
  if (existsSync(path.join(process.cwd(), "eslint.config.js"))) {
    let eslintConfig = readFileSync(path.join(process.cwd(), "eslint.config.js"), "utf8");
    eslintConfig =
      eslintConfig.slice(0, eslintConfig.indexOf("files:") - 9) +
      `'plugin:prettier/recommended'` +
      eslintConfig.slice(eslintConfig.indexOf("files:") - 9);
    writeFileSync(path.join(process.cwd(), "eslint.config.js"), eslintConfig, "utf8");
  }
  loading.succeed("prettier加载完成");
};
