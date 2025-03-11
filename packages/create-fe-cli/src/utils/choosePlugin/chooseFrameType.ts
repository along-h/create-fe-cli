import inquirer from "inquirer";
import { FRAME_TYPES, TFrameType } from "./constants";
/**
 * 选择框架类型以及项目名称
 */
export default async () => {
  const { type: frameType } = await inquirer.prompt({
    type: "list",
    name: "type",
    message: `请选择项目的框架类型`,
    choices: FRAME_TYPES
  });
  const { name } = await inquirer.prompt({
    type: "input",
    name: "name",
    message: `请输入项目名称`,
    default: "my-app"
  });
  return {
    frameType,
    name
  } as { frameType: TFrameType; name: string };
};
