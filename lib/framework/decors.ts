import * as glob from 'glob'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import { resolve, join } from 'path'
// import { router } from './restful/router';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'

interface ILoadOptions {
    extname?: string
}

interface IRouteOptions {
    prefix?: string
    middlewares?: Koa.Middleware[]
}

// const router = new KoaRouter()

let router = null

const decorate = (httpMethod: HTTPMethod, path: string, options: IRouteOptions = {}) => {
    return (target, property: string) => {
        process.nextTick(() => {
            if(!router) {
                return 
            }

            // 添加中间件数组
            const mids = []
            if (options.middlewares) {
                mids.push(...options.middlewares)
            }

            if (target.middlewares) {
                mids.push(...target.middlewares)
            }

            mids.push(target[property])

            // url前缀
            const url = options.prefix ? options.prefix + path : path
            // router[method](url, target[property])
            router[httpMethod](url, ...mids)
        })
    }
}

const method = (methodName) => (path: string, options?: IRouteOptions) => decorate(methodName, path, options)
export const get = method('get')
export const post = method('post')
export const put = method('put')
export const del = method('del')

export const load = (folder: string, options: ILoadOptions = {}, app) => {
   
    router = app.$router
    const extname = options.extname || '.{js,ts}'

    glob.sync(join(folder, `./**/*${extname}`))
        .filter(v => v.indexOf('.spec') === -1) // 排除测试代码
        .forEach(item => require(item))
}

export const middlewares = (mids: Koa.Middleware[]) => {
    return (target) => {
        target.prototype.middlewares = mids
    }
}
