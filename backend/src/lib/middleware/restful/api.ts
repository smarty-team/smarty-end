export const api = {
    init(app) {
        return async (ctx, next) => {
            console.log('model:', app.$model, ctx.params.model)
            const model = app.$model[ctx.params.model]
            if (model) {
                ctx.model = model
                await next()
            } else {
                ctx.body = 'no this model'
            }
        }
    },

    async list(ctx) {
        // sortOrder = 'asc' | 'desc'
        //
        const condition = {
            pageNo: 1,
            pageSize: 100,
            sortField: '_id',
            sortOrder: 'asc',
        }
        Object.assign(condition, ctx.query)

        const total = await ctx.model.find().count()
        const sort = {}
        sort[condition.sortField] = condition.sortOrder
        const list = await ctx.model
            // 1是升序，-1是降序
            .find({}, null, { sort }) // 增加
            // 对查询结果培训
            // .sort({ 'realName': 'desc' })
            .skip((condition.pageNo - 1) * condition.pageSize)
            .limit(condition.pageSize)

        ctx.success({ list, pagination: { total, pageNo: condition.pageNo - 0, pageSize: condition.pageSize - 0 } })
    },

    async get(ctx) {
        ctx.success(await ctx.model.findOne({ _id: ctx.params.id }))
    },

    async create(ctx) {
        const res = await ctx.model.create(ctx.request.body)
        ctx.success(res)
    },
    async update(ctx) {
        const res = await ctx.model.updateOne({ _id: ctx.params.id }, ctx.request.body)
        ctx.success(res)
    },
    async del(ctx) {
        const res = await ctx.model.deleteOne({ _id: ctx.params.id })
        ctx.success(res)
    },
}
