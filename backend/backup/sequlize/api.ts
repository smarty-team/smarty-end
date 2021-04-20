export const api = {
    init(app) {
        return async (ctx, next) => {
            console.log('model:', app.$model, ctx.params.list)

            // const { default: model } = require(`../../model/${ctx.params.list}`)
            // console.log('model', model)

            const model = app.$model[ctx.params.list]
            if (model) {
                ctx.list = model
                await next()
            } else {
                ctx.body = 'no this model'
            }
        }
    },

    async get(ctx) {
        ctx.body = await ctx.list.findByPk(ctx.params.id)
    },

    async list(ctx) {
        ctx.body = await ctx.list.findAll({})
    },

    async create(ctx) {
        const res = await ctx.list.create(ctx.request.body)
        ctx.body = res
    },
    async update(ctx) {
        const res = await ctx.list.update(ctx.request.body, { where: { id: ctx.params.id } })
        ctx.body = res
    },
    async del(ctx) {
        const res = await ctx.list.destroy({ where: { id: ctx.params.id } })
        ctx.body = res
    },
    async page(ctx) {
        console.log('page...', ctx.params.page)
        ctx.body = await ctx.list.findAll({}) /*  */
    },
}
