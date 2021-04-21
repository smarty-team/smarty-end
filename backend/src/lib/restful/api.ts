export const api = {
    init(app) {
        return async (ctx, next) => {
            console.log('model:', app.$model, ctx.params.list)
            const model = app.$model[ctx.params.list]
            if (model) {
                ctx.list = model
                await next()
            } else {
                ctx.body = 'no this model'
            }
        }
    },

    async list(ctx) {
        ctx.success(await ctx.list.find({}))
    },

    async get(ctx) {
        ctx.success(await ctx.list.findOne({ _id: ctx.params.id }))
    },
    
    async create(ctx) {
        const res = await ctx.list.create(ctx.request.body)
        ctx.success(res)
    },
    async update(ctx) {
        const res = await ctx.list.updateOne({ _id: ctx.params.id }, ctx.request.body)
        ctx.success(res)
    },
    async del(ctx) {
        const res = await ctx.list.deleteOne({ _id: ctx.params.id })
        ctx.success(res)
    },
}
