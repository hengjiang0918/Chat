# 聊天系统
Nodejs聊天系统
必须包括如下技术：
Nodejs
MongoDB
Webstock
Express
DevOps
Unit test TDD(Mocha)

---------------------

用户注册\登录模块
群聊\私聊功能
聊天记录保存功能
mocha 单元测试
查重问题
 

## Setup
```bash
# 后端api
cd server && npm i # yarn
npm run start

# 前端
cd client && npm i # yarn
npm run dev
npm run dev:admin
```


## 技术栈
1. 前台C端
  - Vue
  - Vue-route
  - Vuex
  - element-ui
  - webpack
  - ...
2. 管理端
  - express
  - node
  - jsonwebtoken
  - socket.io
  - nodemon
  - mongoose
  - ...

## 部署说明
1. 环境要求: 
  - MongoDB环境启动27017；检查：localhost:27017是否能访问通
2. 进入client/server目录分布执行npm install
3. 进入server目录执行npm run start(启动api接口)
4. 进入client目录执行npm run dev(启动客户端项目，浏览器访问localhost:8080)
