import * as Koa from 'koa'
export const findByName = (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (name === 'xia') {
                reject('用户已存在')
            } else {
                resolve()
            }
        }, 500)
    })
}

// export const guard = async function guard(ctx: Koa.Context, next: () => Promise<any>) {

//     if (ctx.header.token) {
//         await next();
//     } else {
//         throw "请登录";
//     }
// }
// ])
