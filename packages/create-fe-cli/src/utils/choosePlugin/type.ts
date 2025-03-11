/**
 * 基础类型
 * @property {string} type 类型
 * @property {string} value 值
 */
export interface IBaseCheckItem {
  type: string;
  value: string | boolean;
}
/**
 * 检查列表类型
 * @property {any[]} config 检查项列表
 */
export interface ICheckItem extends IBaseCheckItem {
  config?: any[];
}

/** stylelint 配置项类型 */
export type ItemType = "hasLess" | "hasSass" | "hasStylus";
