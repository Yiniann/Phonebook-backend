import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // 设置文件为 CommonJS 模块
      globals: {
        ...globals.browser, // 注入浏览器环境的全局变量
        ...globals.node, // 注入 Node.js 环境的全局变量
      },
    },
    plugins: {
      "@stylistic/js": stylisticJs, // 使用 @stylistic/js 插件
    },
    rules: {
      "@stylistic/js/indent": ["error", 2], // 缩进 2 个空格
      "@stylistic/js/linebreak-style": ["error", "unix"], // 使用 Unix 换行符
      "@stylistic/js/quotes": ["error", "single"], // 使用单引号
      "@stylistic/js/semi": ["error", "never"], // 禁止分号
    },
  },
  pluginJs.configs.recommended, // 使用 @eslint/js 的推荐配置
];