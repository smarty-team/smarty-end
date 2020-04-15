import * as Koa from 'koa'
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';

import { load } from '../framework/decors';
import { load as restful } from '../framework/restful/index'
import { resolve } from 'path'
import { Sequelize } from 'sequelize-typescript'
import { config } from '../config/index'
import * as KoaRouter from 'koa-router';
import { createDataBase } from '../data/initDb'
export default class Smarty {
    app: Koa
    $router: KoaRouter
    $model: any
    constructor() {
        this.app = new Koa()
        this.app.use(
            bodify({
                multipart: true,
                strict: false
            })
        )

        this.app.use(async (ctx, next) => {
            try {
                await next()
            } catch (err) {
                ctx.body = {
                    code: 500, // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
                    error: err.message
                }
            }
        })

        // 加载数据库
        if (config.db) {
            // 初始化数据库
            console.log('-----create')
            createDataBase(config.db)
            const sequelize = new Sequelize(
                Object.assign(config.db, { modelPaths: [`${__dirname}/../model`] })
            );
            // 数据库强制同步
            sequelize['sync']({ force: config.option.forceSync })

            // 加载数据Model
            // 这个地方有点偷懒 赶进度先这样 应该是基于文件名加载 而不应该是直接小写字母
            const models = sequelize['models']
            this.$model = {}
            Object.keys(models).map(key => {
                console.log('keys:', key.toLowerCase())
                this.$model[key.toLowerCase()] = models[key]
            })
        }
        this.$router = new KoaRouter()

        // 加载restfu接口
        config.option.restful && restful(this)

        // 路由加载器
        load(resolve(__dirname, '../controller'), {}, this);
        this.app.use(this.$router.routes())
    }


    listen(port: number, hostname?: string,
        listeningListener?: () => void) {
        this.app.listen(port, hostname, listeningListener && (() => {
            console.log('Smarty End Start at 3000')
        }))
    }
};