export default {
    schema: {
        mobile: { name: '手机号',type: String, unique: true, required: true },
        password: { name: '密码',type: String, required: true  },
        realName: { name: '真实姓名',type: String, required: true },
        avatar: { name: '头像',type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm' },
        createdAt: { name: '创建时间',type: Date, default: Date.now },
    },
}
