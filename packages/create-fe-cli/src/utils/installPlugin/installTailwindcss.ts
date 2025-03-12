import path from "path";
import { copyFilesSync } from "../copyeFiles";
import { wiritePkgByPkg } from "../writeFile";
import ora from "ora";
import log from "../log";
import { readFileSync, writeFileSync, existsSync } from "fs-extra";

/** 判断vue文件类型，js/ts */
const getVueFile: () => "/src/main.ts" | "/src/main.js" = () => {
  if (existsSync(process.cwd() + "/src/main.ts")) {
    return "/src/main.ts";
  } else {
    return "/src/main.js";
  }
};

export default async (frameType: "react" | "vue", installType: "template" | "cli") => {
  const loading = ora("开始安装tailwindcss");
  loading.start();
  try {
    // 写入package.json
    await wiritePkgByPkg(
      path.resolve(path.join(__dirname, "../../config/tailwindcss/package.json"))
    );
    // 复制config文件
    const curPath = path.join(__dirname, `../../config/tailwindcss/${frameType}.config.js`);
    copyFilesSync(curPath, process.cwd() + "/tailwind.config.js");
    // 复制样式文件
    const cssPath = path.join(__dirname, `../../config/tailwindcss/tailwindBase.css`);
    if (frameType === "react" && installType === "cli") {
      const content = "import './tailwindBase.css';\n";
      copyFilesSync(cssPath, process.cwd() + "/src/tailwindBase.css");
      const oldContent = await readFileSync(process.cwd() + "/src/index.tsx", "utf8");
      const newContent = content + oldContent;
      writeFileSync(process.cwd() + "/src/index.tsx", newContent, "utf8");
    } else {
      const installMap = {
        react: "/src/main.tsx",
        vue: getVueFile
      };
      const filePath = process.cwd() + installMap[frameType];
      const content = "import './assets/tailwindBase.css';\n";
      copyFilesSync(cssPath, process.cwd() + "/src/assets/tailwindBase.css");
      const oldContent = await readFileSync(filePath, "utf8");
      const newContent = content + oldContent;
      writeFileSync(filePath, newContent, "utf8");
    }
    loading.succeed("安装tailwindcss成功");
  } catch (error: any) {
    loading.fail("安装tailwindcss失败");
    log.error(error);
  }
};
