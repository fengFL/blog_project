let ipUrl = 'http://127.0.0.1:7001/default'
let servicePath = {
    getArticleList: ipUrl + '/getArticleList/', // 首页接口
    getArticleById: ipUrl + '/getArticleById/', // 详细页接口
    getArticlesByTypeId: ipUrl + "/getArticlesByTypeId/", // 按类别获取文章列表
    getTypeInfo: ipUrl + '/getTypeInfo/'
}

export default servicePath