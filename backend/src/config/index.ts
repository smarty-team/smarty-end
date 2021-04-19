// import { ISequelizeConfig } from "sequelize-typescript"
interface IConfig {
    // db?: ISequelizeConfig,
    db: {}
    option?: {
        restful: boolean
        // 是否强制数据库同步
        forceSync: boolean
    }
    root: string
}
import { resolve } from 'path'
const config: IConfig = {
    db: {
        dialect: 'mysql',
        host: 'localhost',
        database: 'smarty',
        username: 'root',
        password: 'example',
    },
    option: {
        restful: true,
        // 是否强制数据库同步
        forceSync: false,
    },
    root: resolve('.'),
}

if (process.env.NODE_ENV === 'production') {
    config.db = {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
}

export { config }

// export config
