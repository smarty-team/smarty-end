export default {
    description: '用户管理',
    schema: {
        mobile: { description: '手机号', type: 'String', unique: true, required: true },
        password: { description: '密码', type: 'String', required: true },
        realName: { description: '真实姓名', type: 'String', required: true },
        avatar: {
            description: '头像',
            type: 'String',
            default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm',
        },
    },
}
