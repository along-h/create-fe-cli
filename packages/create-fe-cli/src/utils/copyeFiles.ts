import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs-extra";
import path from "path";

/**
 * 复制一个或多个文件到指定目录
 * @param source 要复制的文件路径 或 文件路径数组
 * @param target 目标目录路径
 */
export const copyFilesSync = (source: string | string[], target: string | string[]) => {
  if (Array.isArray(source)) {
    source.forEach((s, index) => {
      copyFileSync(s, target[index]);
    });
  } else {
    if (!Array.isArray(target)) {
      copyFileSync(source, target);
    }
  }
};

/**
 * 复制文件夹
 * @param src 源文件夹路径
 * @param dest 目标文件夹路径
 */
export const copyDirSync = (src: string, dest: string) => {
  const files: any[] = [];
  const filesInDir = readdirSync(src);
  // 判断目标文件夹是否存在，不存在则创建
  if (!existsSync(dest)) {
    mkdirSync(dest);
  }
  for (let i = 0; i < filesInDir.length; i++) {
    const file = filesInDir[i];
    const current = path.join(src, file);
    const stats = statSync(current);
    if (stats.isFile()) {
      copyFileSync(current, path.join(dest, file));
    } else if (stats.isDirectory()) {
      // 创建目录
      mkdirSync(path.join(dest, file));
      copyDirSync(current, path.join(dest, file));
    }
  }
  return files;
};
