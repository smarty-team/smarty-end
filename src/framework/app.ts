import * as Koa from 'koa'
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';

import { load } from '../framework/decors';
import {  load as restful }  from '../framework/restful/index';
import { resolve } from 'path'
import { Sequelize } from 'sequelize-typescript';
import { db ,option} from '../config/index'
import * as KoaRouter from 'koa-router';

export default class Smarty {
    app: Koa
    $router: KoaRouter
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
        if(db){
            const sequelize = new Sequelize(
                Object.assign(db, { modelPaths: [`${__dirname}/../model`] })
            );
            // 数据库强制同步
            sequelize['sync']({ force: option.forceSync })
        }
        
        this.$router = new KoaRouter()

        // 加载restfu接口
        option.restful && restful(this)
        
        // 路由加载器
        load(resolve(__dirname, '../routes'),{},this);

        this.app.use(this.$router.routes())
    }

    listen(...args) {
        this.app.listen(...args, () => {
            console.log('Smarty End Start at 3000')
        })
    }
};