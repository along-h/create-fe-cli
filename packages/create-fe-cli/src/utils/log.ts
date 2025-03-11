import chalk from "chalk";
import { PKG_NAME, UNICODE } from "./choosePlugin/constants";
import { time } from "console";

const { green, blue, yellow, red } = chalk;

export default {
  success(text: string) {
    console.log(green(text));
  },
  info(text: string) {
    console.info(blue(text));
  },
  warn(text: string) {
    console.info(yellow(text));
  },
  error(text: string) {
    console.error(red(text));
  },
  time(text?: string) {
    console.time(green(`${text}`));
  },
  timeEnd(text?: string) {
    console.timeEnd(green(`${text}`));
  },
  result(text: string, pass: boolean) {
    console.info(
      blue(`[${PKG_NAME}] ${text}`),
      pass ? green(UNICODE.success) : red(UNICODE.failure)
    );
  }
};
