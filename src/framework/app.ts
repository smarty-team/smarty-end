import * as Koa from 'koa'
import * as bodify from 'koa-body';
import * as serve from 'koa-static';
import * as timing from 'koa-xtime';

import { load } from '../framework/decors';
import { resolve } from 'path'
import { Sequelize } from 'sequelize-typescript';
import { db } from '../config/index'

export default class Smarty  {
    app: Koa
    constructor() {
        this.app = new Koa()
        this.app.use(
            bodify({
                multipart: true,
                strict: false
            })
        )
        const sequelize = new Sequelize(
            Object.assign(db, { modelPaths: [`${__dirname}/../model`] })
        );
        // 数据库强制同步
        sequelize['sync']({force:true})

        
        const router = load(resolve(__dirname, '../routes'));
        this.app.use(router.routes())
    }

    listen(...args) {
        this.app.listen(...args, () => {
            console.log('Smarty End Start at 3000')
        })
    }
};