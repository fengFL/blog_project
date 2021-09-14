const apiUrl = "http://localhost:7001/admin"
const servicePath = {
    checkLogin: apiUrl + "/checkLogin/", // post登录检验接口
    getTypeInfo: apiUrl + "/getTypeInfo/", // 获取文章分类信息接口
    addArticle: apiUrl + "/addArticle/", // 添加文章接口
    updateArticle: apiUrl + "/updateArticle/", // 更新文章接口
    getArticleList: apiUrl + "/getArticleList/", // 获取博客列表
    delArticle: apiUrl + "/delArticle/", // 删除博客文章接口
    getArticleById: apiUrl + "/getArticleById/", // 根据id获得文章信息
}
export default servicePath