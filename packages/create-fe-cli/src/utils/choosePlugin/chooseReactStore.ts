import inquirer from "inquirer";

/**
 * 选择react-store管理工具
 *
 */
export default async (step: number) => {
  const { store } = await inquirer.prompt({
    type: "list",
    name: "store",
    message: `Step ${step}. 请选择React store管理工具`,
    choices: [
      {
        name: "Redux",
        value: "Redux"
      },
      // {
      //   name: "MobX",
      //   value: "MobX"
      // },
      {
        name: "None",
        value: "None"
      }
    ]
  });
  return store;
};
