export default async function addHelper(ctx,next) {
    ctx.success = (res = null, msg = '请求成功') => {
        ctx.body = {
            code: 0,
            data: res,
            msg,
        }
        ctx.status = 200
    }
    await next()
}
