import Smarty from '../app'

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

function load(dir, cb) {
    const files = fs.readdirSync(dir)
    files.forEach((filename) => {
        // 去掉后缀名
        filename = filename.replace('.ts', '')
        // 导入文件
        const file = require(dir + '/' + filename)
        // 处理逻辑
        cb(filename, file)
    })
}

export const loadModel = (app: Smarty) => {
    const { url, options } = app.config.mongo
    mongoose.connect(url, options)
    const conn = mongoose.connection
    conn.on('error', () => console.error('连接数据库失败'))
    app.$model = {}

    load(app.rootPath + '/model', (filename, config) => {
        console.log('load model: ' + filename)
        app.$model[filename] = mongoose.model(filename, config.default.schema)
    })
}

export const initData = (app: Smarty) => {
    load(app.rootPath + '/data', async (name, data) => {
        console.log('initData: ', name)
        const forceUpdate = app.config.mongo.forceUpate
        const model = app.$model[name.replace('.json', '')]
        model.deleteMany({})
        if (forceUpdate) await model.deleteMany()
        await model.insertMany(data)
    })
}
