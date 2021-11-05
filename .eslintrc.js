module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  extends: ['plugin:json/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
};
