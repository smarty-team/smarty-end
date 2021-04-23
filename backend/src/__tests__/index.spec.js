const request = require('request')
function createServer(host) {
    const createRequest = (method) => (url) => {
        return new Promise((resolve, reject) => {
            request(
                {
                    url: host + url,
                    method,
                    headers: {
                        'content-type': 'application/json',
                    },
                },
                (err, req, body) => {
                    if (!err) {
                        resolve(JSON.parse(body))
                    } else {
                        reject(err)
                    }
                },
            )
        })
    }

    return {
        get: createRequest('GET'),
        post: createRequest('POST'),
    }
}
const server = createServer('http://localhost:4000')

it('Test /api/metadata', async () => {
    const body = await server.get('/api/metadata')
    expect(body.code).toBe(0)
    expect(body.data).toEqual([
        {
            id: 'user',
            description: '用户管理',
        },
    ])
})

it('Test /api/metadata/user', async () => {
    const body = await server.get('/api/metadata/user')
    expect(body.code).toBe(0)
    expect(body.data).toEqual({
        description: '用户管理',
        schema: {
            mobile: {
                description: '手机号',
                type: 'String',
                unique: true,
                required: true,
            },
            password: {
                description: '密码',
                type: 'String',
                required: true,
            },
            realName: {
                description: '真实姓名',
                type: 'String',
                required: true,
            },
            avatar: {
                description: '头像',
                type: 'String',
                default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm',
            },
        },
    })
})

it('Test /api/resource/user', async () => {
    const body = await server.get('/api/resource/user')
    expect(body.code).toBe(0)
})
