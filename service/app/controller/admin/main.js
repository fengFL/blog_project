"use strict"
const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
        this.ctx.body = 'hi,admin api....'
    }
    // 验证用户名状态
    async checkLogin() {
        const { username, password } = this.ctx.request.body
        // 如果没有用户名或者密码 就返回false
        if (!password || !username) {
            this.ctx.session.openId = null
            return false
        }
        const sql = `
        SELECT username FROM admin_user WHERE
        username='${username}' AND password='${password}'`
        // const sql = `
        // SELECT username FROM admin_user WHERE username='liufeng' AND password='liufeng'`
        const result = await this.app.mysql.query(sql)
        if (result.length > 0) { // 如果有数据
            const openId = +new Date()
            // 设置session 
            this.ctx.session.openId = { openId }
            this.ctx.body = {
                code: 0,
                openId,
                message: '验证成功',
            }
        } else {
            this.ctx.session.openId = null
            this.ctx.body = {
                code: 1,
                message: '验证失败'
            }
        }

    }

    // 获取分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {
            data: resType,
            code: 0
        }
    }

    // 添加文章
    async addArticle() {
        // 获取请求体重的内容
        const temArticle = this.ctx.request.body
        console.log(temArticle)
        // 给数据库添加内容，并获得结果 
        const result = await this.app.mysql.insert('article', temArticle)
        // 如果插入成功，result中有一个影响行，会有结果
        const isSuccess = result.affectedRows === 1
        // 获得添加的id，方便后期做判断是添加 或者是更新文章
        const insertId = result.insertId

        this.ctx.body = {
            code: 0,
            message: '添加文章成功',
            isSuccess,
            insertId,
        }


    }

    // 更新文章
    async updateArticle() {
        const temArticle = this.ctx.request.body
        console.log(temArticle)
        const res = await this.app.mysql.update('article', temArticle)
        // 获得更新结果
        const isSuccess = res.affectedRows === 1

        this.ctx.body = {
            isSuccess,
        }
    }

    // 获取文章列表
    async getArticleList() {
        const sql = `
        SELECT
        article.id as id,
        article.title as title,
        article.introduce as introduce,
        FROM_UNIXTIME(article.addTime, '%Y-%m-%d') as addTime,
        type.typeName as typeName
        FROM
        article LEFT JOIN type ON article.type_id = type.id
        ORDER BY
        article.id DESC
        `
        const list = await this.app.mysql.query(sql)
        this.ctx.body = {
            data: list
        }
    }

    // 删除博客方法
    async delArticle() {
        const id = this.ctx.params.id
        const res = this.app.mysql.delete('article', { 'id': id })
        this.ctx.body = {
            code: 0,
            data: res
        }
    }

    // 根据id获取对应文章
    async getArticleById() {
        // 获得传递过来的id
        const { id } = this.ctx.params
        // 设置sql语句
        const sql = `
        SELECT
        article.id as articleId,
        article.title as title,
        article.introduce as introduce,
        FROM_UNIXTIME(article.addTime, '%Y-%m-%d') as addTime,
        article.article_content as article_content, 
        type.typeName as typeName,
        type.id as typeId
        FROM
        article LEFT JOIN type ON article.type_id = type.id
        WHERE article.id='${id}'
        `
        // 查询数据库
        const res = await this.app.mysql.query(sql)
        // 返回数据
        this.ctx.body = {
            data: res
        }
    }
}


module.exports = MainController