import path from "path";
import fs from "fs-extra";
export type TFrameType = "react" | "vue";
export enum UNICODE {
  success = "\u2714", // ✔
  failure = "\u2716" // ✖
}

// 读取 package.json
const pkg: Record<string, any> = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../../package.json"), "utf8")
);
/**
 * 包名
 */
export const PKG_NAME: string = pkg.name;

/**
 * 包版本号
 */
export const PKG_VERSION: string = pkg.version;
/**
 * 框架模板
 */
export const FRAME_TYPES: Array<{ name: string; value: string }> = [
  {
    name: "Vue",
    value: "vue"
  },
  {
    name: "React",
    value: "react"
  }
];
/** 安装vue方式 */
export const VUE_INSTALL_TYPE: Array<{ name: string; value: string }> = [
  {
    name: "create-fe-template",
    value: "template"
  },
  {
    name: "create-vue-template",
    value: "create-vue"
  }
];
/** 安装react方式 */
export const REACT_INSTALL_TYPE: Array<{ name: string; value: string }> = [
  {
    name: "create-fe-template",
    value: "template"
  },
  {
    name: "create-react-app",
    value: "cli"
  }
];
/** 模板地址 */

export const TEMPLATE_URL = {
  react: path.join(__dirname, "../../template/react18-ts"),
  vue: path.join(__dirname, "../../template/vue3-ts")
};
/**
 * 框架脚手架
 */
export const FRAME_CLI_TYPES = {
  react: "create-react-app",
  vue: "create-vue"
};
type TCheckType = { name: string; type: string }[];
/**
 * vue配置校验类型
 */
export const VUE_CHECK_TYPES: TCheckType = [
  {
    name: "是否配置commitlint",
    type: "commitlint"
  },
  {
    name: "是否配置stylelint",
    type: "stylelint"
  },
  // {
  //   name: "是否配置prettier",
  //   type: "prettier"
  // },
  // {
  //   name: "是否配置markdowlint",
  //   type: "markdownlint"
  // },
  {
    name: "是否配置postcss",
    type: "postcss"
  },
  {
    name: "是否配置tailwindcss",
    type: "tailwindcss"
  }
];
/**
 * react 配置校验类型
 */
export const REACT_CHECK_TYPES: TCheckType = [
  ...VUE_CHECK_TYPES,
  {
    name: "是否配置prettier",
    type: "prettier"
  }
];
