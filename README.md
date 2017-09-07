# 学习记录

## 安装

使用npm webpack和webpack测试服务

     npm install --save-dev webpack webpack-dev-server

## 配置

默认webpack的配置是写再webpack.config.js里的，但是考虑到生产环境和开发环境的需求不同，所以我将
配置写再三个不同的js文件里，分别是:

- webpack.common.js（公共部分配置）
- webpack.dev.js(开发环境配置)
- webpack.prod.js(生产环境配置)

### webpack.common.js










