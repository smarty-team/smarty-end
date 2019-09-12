import * as Koa from 'koa'
import { get, post, middlewares } from '../framework/decors'
import { querystring, body } from '../framework/validate'
const users = [{ name: 'tom', age: 20 }]

import model from '../model/user'

@middlewares([
    async (ctx, next) => {
        console.log('class middlewares ....')
        await next()

    }
])
export default class User {
    /**
     * 获取用户信息
     * @param ctx 
     */
    @get('/users', {
        middlewares: [
            async (ctx, next) => {
                console.log('method middleware')
                await next()
            }
        ]
    })
    @querystring({
        id: { type: 'string', required: false, max: 200 },
    })
    public async list(ctx) {
        const users = await model.findAll()
        ctx.body = { ok: 1, data: users };
    }

    /**
     * 创建用户
     * @param ctx 
     */
    @body({
        name: { type: 'string', required: true, max: 200, },
    })
    @post('/users', {
        middlewares: [
            async function (ctx, next) {
                console.log('middleware go.....')
                await next()
            }
        ]
    })
    public add(ctx) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 }
    }
}