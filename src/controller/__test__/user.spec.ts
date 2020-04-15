import User from '../user'
describe('User Controller Test', () => {
    it('list', async () => {
        const user = new User()
        const ctx = {
            body: '',
        }
        await user.list(ctx)
        expect(ctx.body).toEqual({ ok: 1, data: [{ name: 'tom', age: 20 }] })
    })

    it('add', async () => {
        const user = new User()
        const ctx = {
            body: '',
            request: {
                body: [],
            },
        }
        await user.add(ctx)
        expect(ctx.body).toEqual({ ok: 1 })
    })
})
