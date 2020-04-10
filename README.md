# Smarty-end
- 为全栈工程师定制的中后台框架
- 无代码和少代码化
- 基于TypeScript

## Install

- NodeJS 8.0 need [nodejs.org/en](https://nodejs.org/en/)
- mysql need
- Clone or download this repository Enter your local directory, and
- install dependencies:

```
npm install
npm start
```

## Sample

- 约定CRUD接口

  > 只需要添加模型就可以自动生成基础CRUD接口

  ```js
  // 添加模型model/user.js
  import { Table, Column, Model, DataType } from 'sequelize-typescript';
  @Table({})
  class User extends Model<User> {
      @Column({
          primaryKey: true,
          autoIncrement: true,
          type: DataType.INTEGER,
      })
      public id: number;
  
      @Column(DataType.CHAR)
      public name: string;
  }
  export default User
  ```

  - 自动生成如下接口
    - GET /api/user
    - POST /api/user/:id
    - PUT /api/user/:id
    - DELETE /api/user/:id

- 装饰器路由

  ```js
  // router/api.js
  import { get, post } from '../framework/decors'
  export default class User {
      /**
       * 获取购物车
       * @param ctx 
       */
      @get('/carts')
      public async list(ctx) {
          ctx.body = { ok: 1, data: ['hello'] };
      }
  
      /**
       * 创建购物车
       * @param ctx 
       */
      @post('/carts')
      public add(ctx) {
          ctx.body = { ok: 1 }
      }
  }
  ```

  

- 接口参数校验装饰器

> 检验规则 https://www.npmjs.com/package/parameter

```js
// Post方式
@body({
        name: { type: 'string', required: true, max: 200, 	},
})
// Get方式
@querystring({
        id: { type: 'string', required: false, max: 200 },
})
```





## 开发计划

【✔️】装饰器路由（完成）

【✔️】约定CRUD接口 （Mysql版本开发完成，Mongoose计划中）

【✔️】约定CMS管理界面 （基于UMI AntD）（计划）

【✔️】图形化模型定制器（计划）

【✔️】CLI工具（完成）

【✔️】Jest单元及E2E测试 (计划)

## 欢迎志同道合的兄弟们一起交流
![二维码](assets/wx_qr.png)