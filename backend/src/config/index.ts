// import { ISequelizeConfig } from "sequelize-typescript"
interface IConfig {
    // db?: ISequelizeConfig,
    mysql?: {}
    mongo?: {}
    option?: {
        restful: boolean
        // 是否强制数据库同步
        forceSync: boolean
    }
    root: string
}
import { resolve } from 'path'
const config: IConfig = {
    // mysql: {
    //     dialect: 'mysql',
    //     host: 'localhost',
    //     database: 'smarty',
    //     username: 'root',
    //     password: 'example',
    // },
    mongo: {
        url: 'mongodb://localhost:27017/smarty',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        forceUpate: true, // 是否强制更新数据库数据
    },
    option: {
        restful: true,
        // 是否强制数据库同步
        forceSync: true,
    },
    root: resolve('.'),
}

if (process.env.NODE_ENV === 'production') {
    // config.mysql = {
    //     dialect: 'mysql',
    //     host: process.env.DB_HOST,
    //     database: process.env.DB_NAME,
    //     username: process.env.DB_USER,
    //     password: process.env.DB_PASSWORD,
    // }
}

export { config }

// export config
