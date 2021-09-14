'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx, app } = this;


        ctx.body = 'api hi';
    }

    // 获取文章列表
    async getArticleList() {
        const { ctx, app } = this;
        const { mysql } = app
        // 通过数据库直接转换成需要的时间格式。
        let sql = `SELECT 
        article.id as id, 
        article.title as title, 
        article.introduce as introduce, 
        FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime, 
        article.view_count as view_count, 
        type.typeName as typeName 
        FROM article LEFT JOIN type ON article.type_id = type.id
        `

        const results = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: results
        }

    }
    async getArticleById() {
        const id = parseInt(this.ctx.params.id)
        let sql = `SELECT 
        article.id as id, 
        article.title as title, 
        article.introduce as introduce, 
        article.article_content as article_content, 
        FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime, 
        article.view_count as view_count, 
        type.typeName as typeName, 
        type.id as typeId 
        FROM article LEFT JOIN type ON article.type_id = type.id 
        WHERE article.id='${id}';`


        const result = await this.app.mysql.query(sql)
        // console.log(result) 
        // 查询出来的是一个数组，我们只需要其中索引值为0的成员。直接返回对象。
        this.ctx.body = { data: result[0] }
    }
    async getArticlesByTypeId() {
        const { id } = this.ctx.params
        let sql = `SELECT 
        article.id as id, 
        article.title as title, 
        article.introduce as introduce, 
        article.article_content as article_content, 
        FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime, 
        article.view_count as view_count, 
        type.typeName as typeName, 
        type.id as typeId 
        FROM article LEFT JOIN type ON article.type_id = type.id 
        WHERE type.id='${id}';`
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }

    // 获取类别名称和编号
    async getTypeInfo() {
        const result = await this.app.mysql.select('type')
        this.ctx.body = { data: result }
    }
}

module.exports = HomeController;
