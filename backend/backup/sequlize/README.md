# Server端

## Install

### Node环境
- NodeJS 8.0 need [nodejs.org/en](https://nodejs.org/en/)
- mysql need
- Clone or download this repository Enter your local directory, and
- install dependencies:

```
npm install
npm start
```

## 数据库环境
- Mysql
```
# 创建数据库
# user:         root
# password:     example
mysql -h localhost -u root -pexample 

# database: 'smarty'
CREATE DATABASE smarty;

# 退出
exit
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

## Docker使用
### 获取最新版代码
git pull

#### 强制重新编译容器
docker-compose down
docker-compose up -d --force-recreate --build


