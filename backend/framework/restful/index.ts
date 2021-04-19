import * as glob from 'glob'
import * as KoaRouter from 'koa-router'
import { api } from './api'
export const load = (app) => {
    const { init, get, create, update, del } = api
    const router = app.$router

    router.get('/api/:list', init(app), get)
    router.post('/api/:list', init(app), create)
    router.put('/api/:list/:id', init(app), update)
    router.delete('/api/:list/:id', init(app), del)
}
