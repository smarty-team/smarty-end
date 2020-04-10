import { ISequelizeConfig } from "sequelize-typescript";

export const option = {
    // 是否开启自动restful接口功能
    restful: true,
    // 是否强制数据库同步
    forceSync: true

}


export const db: ISequelizeConfig = {
    dialect: 'mysql',
    host: 'localhost',
    database: 'smarty',
    username: 'root',
    password: 'example'
}
export const middleware = ['logger']
