module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [ "@typescript-eslint" ],
  env: {
    node: true
  },
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "@landonschropp"
  ],
  rules: {
    "prefer-const": "off"
  }
};
