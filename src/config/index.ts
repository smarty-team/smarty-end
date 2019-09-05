import { ISequelizeConfig } from "sequelize-typescript";

export const db: ISequelizeConfig = {
    dialect: 'mysql',
    host: 'localhost',
    database: 'smarty',
    username: 'root',
    password: 'example'
}
export const middleware = ['logger']
