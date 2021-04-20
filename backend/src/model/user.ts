export default {
    schema: {
        mobile: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        realName: { type: String, required: true },
        avatar: { type: String, default: 'https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm' },
        createdAt: { type: Date, default: Date.now },
    },
}
