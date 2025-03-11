// import { execSync } from "child_process";
import {
  FRAME_CLI_TYPES,
  REACT_INSTALL_TYPE,
  TEMPLATE_URL,
  TFrameType
} from "../choosePlugin/constants";
// existsGlobalPkg, isInstallGlobalPkg
// import { existsNpm } from "../existsPkg";
import ora from "ora";
// import log from "../log";
import inquirer from "inquirer";
import fs from "fs-extra";
import { exit } from "process";
import { copyDirSync } from "../copyeFiles";
import chooselintType from "../choosePlugin/chooselintType";
import generateLint from "../generateLint";
import { existsGlobalPkg, existsNpm, isInstallGlobalPkg } from "../existsPkg";
import { execSync } from "child_process";
import log from "../log";
/**
 * 根据选择的项目语言安装框架
 */
export default async (frameType: TFrameType, projectName: string) => {
  const loading = ora();
  try {
    let frameCliType = FRAME_CLI_TYPES[frameType];
    if (frameType === "react") {
      const InstallType = REACT_INSTALL_TYPE;
      // 判断使用脚手架安装还是使用模板创建
      const { type: installReactType } = await inquirer.prompt({
        type: "list",
        name: "type",
        message: `请选择安装${frameType}方式`,
        choices: InstallType
      });
      // 检查目标文件夹是否存在，如果存在则删除它
      if (fs.existsSync(projectName)) {
        fs.removeSync(projectName);
      }
      if (installReactType === "template") {
        // 选择代码规范
        const checkList = await chooselintType(frameType);
        const templateUrl = TEMPLATE_URL[frameType];
        // 创建项目文件夹
        fs.mkdirSync(projectName);
        copyDirSync(templateUrl, projectName);
        // 进入项目文件夹
        process.chdir(projectName);
        // 根据选择的规范安装相应的依赖
        await generateLint(frameType, checkList, "template");
        loading.succeed(`创建react项目成功`);
        return;
      }
    }

    // 根据脚手架安装包
    // 判断是否存在全局包
    const isExistsGlobalCli = await existsGlobalPkg(frameCliType);
    const npm = await existsNpm;
    let isInstallGloal;
    if (!isExistsGlobalCli) {
      isInstallGloal = await isInstallGlobalPkg(frameCliType);
      const command = isInstallGloal ? "-g" : "";
      // 安装脚手架
      execSync(`${npm} install ${frameCliType} ${command}`, {
        stdio: "inherit"
      });
    }
    log.info(`根据${frameCliType}创建${frameType}项目`);
    const npxCommand = isInstallGloal ? frameCliType : `npx ${frameCliType}`;
    // react
    if (frameCliType === "create-react-app") {
      execSync(`${npxCommand} ${projectName} --template typescript`, { stdio: "inherit" });
    } else {
      // vue
      execSync(`${npxCommand} ${projectName}`, { stdio: "inherit" });
    }
    // // 选择代码规范
    const checkList = await chooselintType(frameType);
    // // 根据选择的规范安装相应的依赖
    loading.start(`正在使用 ${npm} 安装规范依赖...`);
    // 进入项目文件夹
    process.chdir(projectName);
    await generateLint(frameType, checkList, "cli");
    loading.succeed(`创建react项目成功`);
  } catch (error) {
    loading.fail(`创建 ${frameType} 失败，错误信息如下：\n ${error}`);
    exit(1);
  }
};
