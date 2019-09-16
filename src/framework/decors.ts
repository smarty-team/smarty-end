import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
// import { router } from './restful/router';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'

type LoadOptions = {
    extname?: string
}

type RouteOptions = {
    prefix?: string;
    middlewares?: Array<Koa.Middleware>
}

// const router = new KoaRouter()

let router

const decorate = (method: HTTPMethod, path: string, options: RouteOptions = {}) => {
    return (target, property: string) => {
     
        process.nextTick(() => {
            // 添加中间件数组
            const middlewares = []
            if (options.middlewares) {
                middlewares.push(...options.middlewares)
            }

            if (target.middlewares) {
                middlewares.push(...target.middlewares)
            }

            middlewares.push(target[property])

            // url前缀
            const url = options.prefix ? options.prefix + path : path
            // router[method](url, target[property])
            router[method](url, ...middlewares)
        })

    }
}

const method = methodName => (path: string, options?: RouteOptions) => decorate(methodName, path, options)
export const get = method('get')
export const post = method('post')
export const put = method('put')
export const del = method('del')



export const load = (folder: string, options: LoadOptions = {},app) => {
    router = app.$router
    const extname = options.extname || '.{js,ts}'
    glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach((item) => require(item))
}


export const middlewares = (middlewares: Koa.Middleware[]) => {
    return function (target) {
        target.prototype.middlewares = middlewares
    }
}

