import { execSync } from "child_process";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { wiritePkgByPkg } from "../writeFile";
import { copyFilesSync } from "../copyeFiles";
/**
 * 安装以及配置commitlint
 */
export default async () => {
  // 检查npm/pnpm是否安装
  const loading = ora("正在安装commitlint...");
  loading.start();
  // 复制commitlint配置文件
  copyFilesSync(
    path.resolve(path.join(__dirname, "../../config/commitlint/commitlint.config.js")),
    process.cwd() + "/commitlint.config.js"
  );
  // 安装commitlint
  await wiritePkgByPkg(path.resolve(path.join(__dirname, "../../config/commitlint/package.json")));
  // 初始化git仓库，否则husky无法配置
  execSync(`git init`, { stdio: "inherit" });
  execSync(`npx husky install`, { stdio: "inherit" });
  loading.succeed("husky 安装成功");
  loading.start("配置husky");
  // 配置husky
  fs.writeFileSync(
    path.join(process.cwd(), ".husky", "commit-msg"),
    `#!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"

    npx commitlint --edit \$\{1\}`
  );
  loading.succeed("husky 配置成功");
};
