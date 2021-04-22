import { api } from './api'
import * as fs from 'fs'
export const addRestful = (app) => {
    const { init, get, list, create, update, del } = api
    const router = app.$router

    router.get('/api/resource/:model/:id', init(app), get)
    router.get('/api/resource/:model', init(app), list)
    router.post('/api/resource/:model', init(app), create)
    router.put('/api/resource/:model/:id', init(app), update)
    router.delete('/api/resource/:model/:id', init(app), del)
}

export const addModelList = (app) => {
    const router = app.$router
    router.get('/api/metadata/', (ctx) => {
        const list = fs.readdirSync(app.rootPath + '/model').map((id) => {
            id = id.replace('.ts', '')
            const model = require(`${app.rootPath}/model/${id}`)
            return {
                id,
                description : model.default.description
            }
        })

        ctx.success(list)
    })
    router.get('/api/metadata/:id', (ctx) => {
        const model = require(`${app.rootPath}/model/${ctx.params.id}`).default
        console.log('model',model)
        ctx.success(model)
    })
}
