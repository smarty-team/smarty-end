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
需要Mongodb,可以自行安装
也可以在安装Docker后运行 一键启动MongoDB环境
```
yarn dockerd
```

## 测试版API接口
1. 数据库配置 /config/index.ts
```json
mongo: {
        url: 'mongodb://localhost:27017/smarty',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        forceUpate: true, // 是否强制更新数据库数据
    },
```



2. 设定测试数据 /data/user.json

   示例数据

```json
[
  {
    "avatar": "213213",
    "mobile": "1361234121",
    "password": "王1",
    "realName": "123"
  },
]

```

3. 在 /model中添加模型文件后会自动加载对该资源的Restful接口

   例： /model/user.ts

   ```
   export default {
       schema: {
           mobile: { type: String, unique: true, required: true },
           password: { type: String, required: true },
           realName: { type: String, required: true },
           avatar: { type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm' },
           createdAt: { type: Date, default: Date.now },
       },
   }
   
   ```

   自动对应该资源的Restful接口

   ```
   GET /api/user/:id'      查询指定id的数据
   GET '/api/user					获取数据列表
   POST '/api/user					创建数据
   PUT '/api/user/:id'			修改数据
   DELETE '/api/user/:id'  删除数据
   ```

   

   