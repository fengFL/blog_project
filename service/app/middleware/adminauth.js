module.exports = (options) => {
    return async function adminauth(ctx, next) {

        console.log(ctx.session.openId)
        // 先取得上下文ctx 里面的用户名和 密码，如果
        if (ctx.session.openId) {
            await next()
        } else { // 守卫不成功
            ctx.body = { code: 2, message: '没有登录' }
        }
    }
}
