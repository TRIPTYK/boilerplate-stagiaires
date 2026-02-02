import config from "repo-utils/eslint-node.config.mjs";

export default [
  {
    ignores: ["dist/*"],
  },
  ...config,
];
