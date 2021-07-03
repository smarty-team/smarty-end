import { api } from './api'
import * as fs from 'fs'
import { loadModel } from '../../utils/mongodb'
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

    // 获取模型列表
    router.get('/api/metadata/', (ctx) => {
        const list = fs.readdirSync(app.rootPath + '/model').map((id) => {
            id = id.replace('.json', '')
            const model = require(`${app.rootPath}/model/${id}`)
            return {
                id,
                description: model.description,
            }
        })

        ctx.success(list)
    })
    // 获取单个模型
    router.get('/api/metadata/:id', (ctx) => {
        const model = require(`${app.rootPath}/model/${ctx.params.id}`)
        console.log('model', model)
        ctx.success(model)
    })

    // 创建模型
    router.post('/api/metadata/:id', (ctx) => {
        console.log('create model:', ctx.request.body)
        // 判断是否存在此模型
        const list = fs.readdirSync(`${app.rootPath}/model/`)
        console.log('list', list)
        if (list.find((v) => v.replace('.json', '') === ctx.params.id)) {
            ctx.throw('model is exited')
        }
        writeModel(ctx.params.id, ctx.request.body)
         // 重新加载模型
         // TODO 还没找到好的方法 目前只能通过重启来实现
        //  loadModel(app)
        ctx.success(ctx.request.body)
    })

    // 修改模型
    router.put('/api/metadata/:id', (ctx) => {
        console.log('update model:', ctx.request.body)
        writeModel(ctx.params.id, ctx.request.body)
        // 重新加载模型
        // TODO 还没找到好的方法 目前只能通过重启来实现
        // loadModel(app)
        ctx.success(ctx.request.body)
    })

    /**
     * 写入模型
     * @param id
     * @param data
     */
    function writeModel(id, data) {
        const model = JSON.parse(data)
        fs.writeFileSync(`${app.rootPath}/model/${id}.json`, JSON.stringify(model, null, '\t'), 'utf-8')
    }
}
