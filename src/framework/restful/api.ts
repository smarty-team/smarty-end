
export const api = {
    async init(ctx, next) {
        console.log('model:', ctx.params.list)

        // const model = ctx.app.$model[ctx.params.list]
        const { default: model } = require(`../../model/${ctx.params.list}`)
        console.log('model', model)
        if (model) {
            ctx.list = model
            await next()
        } else {
            ctx.body = 'no this model'
        }
    },

    async get(ctx) {
        ctx.body = await ctx.list.findAll({})

    },
    async create(ctx) {
        const res = await ctx.list.create(ctx.request.body)
        ctx.body = res
    },
    async update(ctx) {
        const res = await ctx.list.update({ _id: ctx.params.id }, ctx.request.body)
        ctx.body = res
    },
    async del(ctx) {
        const res = await ctx.list.delete({ _id: ctx.params.id })
        ctx.body = res
    },
    async page(ctx) {
        console.log('page...', ctx.params.page)
        ctx.body = await ctx.list.findAll({})/*  */
    },
}
