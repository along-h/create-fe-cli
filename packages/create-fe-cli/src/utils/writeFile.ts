import { readFile, readFileSync, writeFileSync } from "fs-extra";
import log from "./log";
/**
 * 向package.json中写入数据
 */
export default async (cmdName: string, cmdContent: string) => {
  // 定义 package.json 的路径
  const packageJsonPath = process.cwd() + "/package.json";
  // 读取 package.json 文件
  const data = await readFile(packageJsonPath, "utf8");
  try {
    // 解析 JSON 数据
    const packageJson = JSON.parse(data);
    // 添加新的 script 命令
    packageJson.scripts = packageJson.scripts || {}; // 确保 scripts 属性存在
    packageJson.scripts[cmdName] = cmdContent; // 替换为你想添加的命
    // 将修改后的对象转换回 JSON 字符串
    const updatedPackageJson = JSON.stringify(packageJson, null, 2);
    // 写入更新后的 package.json
    writeFileSync(packageJsonPath, updatedPackageJson, "utf8");
    log.info(`成功添加 ${cmdName} 命令！`);
  } catch (err) {
    log.error(`写入package.json ${cmdName} 命令失败: ${err}`);
  }
};
/**
 * 通过config的package.json写入package.json
 * @param pkgUrl 写入的package.json的内容路径
 */
export const wiritePkgByPkg = async (pkgContent: string) => {
  // 定义 package.json 的路径
  const packageJsonPath = process.cwd() + "/package.json";
  // 读取 package.json 文件
  const projPkgData = await readFileSync(packageJsonPath, "utf8");
  const configPkgData = await readFileSync(pkgContent, "utf8");
  try {
    // 解析 JSON 数据
    const projPkg = JSON.parse(projPkgData);
    const configPkg = JSON.parse(configPkgData);
    // 合并两个package.json
    for (const key in configPkg) {
      if (configPkg.hasOwnProperty(key)) {
        projPkg[key] = { ...projPkg[key], ...configPkg[key] };
      }
    }
    const mergePkg = { ...projPkg };
    // 将修改后的对象转换回 JSON 字符串
    const updatedPackageJson = JSON.stringify(mergePkg, null, 2);
    // 写入更新后的 package.json
    writeFileSync(packageJsonPath, updatedPackageJson, "utf8");
    const pkgName = pkgContent.split("\\")[pkgContent.split("\\").length - 2];
    log.info(`成功合并${pkgName}package.json！`);
  } catch (err) {
    log.error(`合并package.json失败: ${err}`);
  }
};
