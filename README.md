# Smarty-end
- 为全栈工程师定制的中后台框架
- 无代码和少代码化
- 基于TypeScript


## 目录结构
``` bash
.
├── backend    后端NodeJS
├── frontend   前端Admin界面
```

## Install安装
- [后端Node](./backend/README.md)

## 开发计划

✅ 装饰器路由（完成）

✅ 约定CRUD接口 （Mysql版本开发完成，Mongoose计划中）

⌚️ 约定CMS管理界面 （基于Element3 + Vite）（计划）

⌚️ 图形化表单模型定制器（计划）

✅ CLI工具（完成）

⌚️ Jest单元及E2E测试 (计划)

## 欢迎志同道合的兄弟们一起交流
![二维码](assets/wx_qr.png)


## Docker使用
### 获取最新版代码
git pull

#### 强制重新编译容器
docker-compose down
docker-compose up -d --force-recreate --build


## 参考资料
- 测试Jest And supertest
测试用例：supertest
http://www.voidcn.com/article/p-zselcjuo-bnw.html