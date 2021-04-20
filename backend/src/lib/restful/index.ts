import { api } from './api'
export const load = (app) => {
    const { init, get, list, create, update, del } = api
    const router = app.$router

    router.get('/api/:list/:id', init(app), get)
    router.get('/api/:list', init(app), list)
    router.post('/api/:list', init(app), create)
    router.put('/api/:list/:id', init(app), update)
    router.delete('/api/:list/:id', init(app), del)
}
