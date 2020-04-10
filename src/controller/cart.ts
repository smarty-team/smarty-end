import { get, post } from '../framework/decors'
export default class User {
    /**
     * 获取购物车
     * @param ctx 
     */
    @get('/cart',)
    public async list(ctx) {
        ctx.body = { ok: 1, data: ['hello'] };
    }

    /**
     * 创建购物车
     * @param ctx 
     */
    @post('/cart')
    public add(ctx) {
        ctx.body = { ok: 1 }
    }
}