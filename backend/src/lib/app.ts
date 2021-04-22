import * as Koa from 'koa'
import * as bodify from 'koa-body'

import { load } from './decors'
import { addRestful, addModelList } from './restful/index'
import { resolve } from 'path'
import { config, IConfig } from '../config/index'
import * as KoaRouter from 'koa-router'
// import { createDataBase } from './utils/initDb'
import { loadModel, initData } from './utils/mongodb'
import addHelper from './middleware/helper'

import * as figlet from 'figlet'
import * as clear from 'clear'
import * as chalk from 'chalk'
const log = (content) => console.log(chalk.yellowBright(content))

export default class Smarty {
    app: Koa
    $router: KoaRouter
    $model: any
    rootPath: string
    config: IConfig
    helper: any
    constructor() {
        this.rootPath = resolve('./src')
        this.app = new Koa()
        this.app.use(
            bodify({
                multipart: true,
                strict: false,
            }),
        )
        this.config = config

        // 添加Help函数
        this.app.use(addHelper)

        this.app.use(async (ctx, next) => {
            try {
                await next()
            } catch (err) {
                ctx.body = {
                    code: 500, // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
                    error: err.message,
                }
                throw err
            }
        })

        // 加载数据库
        // if (config.mysql) {
        //     // 初始化数据库
        //     createDataBase(config.mysql)
        //     const sequelize = new Sequelize(Object.assign(config.db, { modelPaths: [`${config.root}/src/model`] }))
        //     // 数据库强制同步
        //     sequelize.sync({ force: config.option.forceSync })

        //     // 加载数据Model
        //     // 这个地方有点偷懒 赶进度先这样 应该是基于文件名加载 而不应该是直接小写字母
        //     const models = sequelize.models
        //     this.$model = {}
        //     Object.keys(models).map((key) => {
        //         console.log('keys:', key.toLowerCase())
        //         this.$model[key.toLowerCase()] = models[key]
        //     })
        // }
        // 加载Mongo
        if (config.mongo) {
            // 加载模块
            loadModel(this)

            // 初始化数据
            initData(this)
        }

        this.$router = new KoaRouter()

        // 加载restfu接口
        if (config.option.restful) {
            addRestful(this)

            addModelList(this)
        }

        // 路由加载器
        // load(resolve(__dirname, `${config.root}/src/controller`), {}, this)
        this.app.use(this.$router.routes())
    }

    listen(port: number, listeningListener?: () => void) {
        this.app.listen(
            port,
            listeningListener ||
                (async () => {
                    clear()
                    log(figlet.textSync('Smarty', {
                        font: 'Ghost',
                        horizontalLayout: 'default',
                        verticalLayout: 'default',
                        width: 80,
                        whitespaceBreak: true
                    }));
                    log(`===================`)
                    log(`Smarty End Start at ${port}`)
                }),
        )
    }
}
