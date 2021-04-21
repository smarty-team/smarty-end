import { api } from './api'
import * as fs from 'fs'
export const addRestful = (app) => {
    const { init, get, list, create, update, del } = api
    const router = app.$router

    router.get('/api/resource/:list/:id', init(app), get)
    router.get('/api/resource/:list', init(app), list)
    router.post('/api/resource/:list', init(app), create)
    router.put('/api/resource/:list/:id', init(app), update)
    router.delete('/api/resource/:list/:id', init(app), del)
}

export const addModelList = (app) => {
    const router = app.$router
    router.get('/api/metadata/', (ctx) => {
        const list = fs.readdirSync(app.rootPath + '/model').map((v) => v.replace('.ts', ''))
        ctx.success(list)
    })
    router.get('/api/metadata/:id', (ctx) => {
        const model = require(`${app.rootPath}/model/${ctx.params.id}`)
        ctx.success(model)

    })
}
