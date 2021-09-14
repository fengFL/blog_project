import {
    Select, Input, Button,
    Row, Col, DatePicker, message,
} from "antd"
import { } from "@ant-design/icons"
import React, { useState, useEffect, useRef } from "react"
import marked from "marked"
import highlight from "highlight.js"
import "../static/css/addArticle.css"
import servicePath from "../config/apiUrl"

const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0) // 文章的id，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')  // 文章标题
    const [articleContent, setArticleContent] = useState('') // markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') // html内容
    const [introducemd, setIntroducemd] = useState('') // 简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') // 简介的html内容
    const [showDate, setShowDate] = useState() // 发布日期
    const [updateDate, setUpdateDate] = useState() // 修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectedType] = useState('') // 选择的文章类别

    const _isMounted = useRef(true) // 使用useRef 引入可变变量。 作为节流阀
    const controller = new AbortController()
    async function getTypeInfo() {
        try {
            // 发送请求 获取文章分类信息
            const response = await fetch(servicePath.getTypeInfo, {
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors'
            })
            const res = await response.json()
            // 如果返回有数据，并且节流阀是开启状态。往下执行
            console.log(res)
            if (_isMounted.current && res) {
                if (res.code === 0) { // 身份验证成功
                    // 更新文章类别信息
                    setTypeInfo(res.data)
                } else if (res.code === 2) { //身份验证失败
                    localStorage.removeItem('openId')
                    props.history.replace('/')
                }
            }

        } catch (error) {
            message.error('网络繁忙，请稍后再试')
        }



    }

    // 根据id获取文章信息
    async function getArticleById(id) {

        if (id) {
            // 发送修改请求，获得文章数据
            const response = await fetch(servicePath.getArticleById + id, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                mode: "cors",
                credentials: "include"
            })
            const res = await response.json()
            const { addTime, introduce, title, typeId, article_content, articleId } = res.data[0]
            setShowDate(addTime)
            setIntroducemd(introduce)
            const html = marked(introduce)
            setIntroducehtml(html)
            setArticleTitle(title)
            setSelectedType(typeId)
            setArticleContent(article_content)
            const content_html = marked(article_content)
            setMarkdownContent(content_html)

        }
    }
    useEffect(() => {
        // 获取类别信息
        getTypeInfo()
        const { id } = props.match.params
        if (id) {
            setArticleId(id)
            getArticleById(id)

        }
        return () => {
            // 如果还有请求，取消fetch请求。
            controller.abort()
            // 将节流阀关闭
            _isMounted.current = false
        }
    }, [showDate])

    // 设置markdown 解析的marked配置
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })
    const handleChange = (e) => {
        // 更新文章内容 articleContent
        setArticleContent(e.target.value)
        // 获取 mark编辑之后的html
        let html = marked(e.target.value)
        // 更新 文章内容的html
        setMarkdownContent(html)
    }
    const introduceChange = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    // 保存文章
    const saveArticle = async () => {
        if (!articleTitle) {
            return message.error('博客标题不能为空')
        } else if (!articleContent) {
            return message.error('博客内容不能为空')
        } else if (!introducemd) {
            return message.error('博客简介不能为空')
        } else if (!showDate) {
            return message.error('发布日期不能为空')
        } else if (!selectedType) {
            return message.error('博客类型不能为空')
        }
        let article = {}
        article.type_id = selectedType
        article.title = articleTitle
        article.article_content = articleContent
        article.introduce = introducemd
        // 使用正则 全局替换 - 为 / 
        const dateText = showDate.replace(/-/g, '/')
        article.addTime = +new Date(dateText) / 1000

        // 如果articleId 为0， 就是新增加的文章
        if (articleId === 0) {
            article.view_count = 0
            try {
                const response = await fetch(servicePath.addArticle, {
                    method: "POST",
                    credentials: 'include',
                    mode: 'cors',
                    body: JSON.stringify(article),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                })
                const res = await response.json()
                if (res.isSuccess) {
                    setArticleId(res.insertId)
                    message.success('发布文章成功')
                } else {
                    message.error('网络异常，发布文章失败')
                }
            } catch (error) {
                message.error('网络繁忙')
            }

        } else { // 当articleId 不为0的时候，就是更新博客内容
            article.id = articleId // 设置

            article.view_count = 0
            try {
                const response = await fetch(servicePath.updateArticle, {
                    method: "POST",
                    mode: 'cors',
                    body: JSON.stringify(article),
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                })
                const res = await response.json()
                if (res.isSuccess) {
                    message.success('博客更新成功')
                } else {
                    message.error('博客更新失败')
                }
            } catch (e) {
                message.error('网络繁忙')
            }
        }


    }
    return (
        <div>
            {/* gutter 间距 */}
            <Row gutter={5}>
                {/* 左侧 */}
                <Col span={18}>
                    {/* 左侧上方添加标题框 */}
                    <Row gutter={10}>
                        {/* Input 文本框 */}
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                size="large"
                                placeholder="博客标题"
                                onChange={(e) => setArticleTitle(e.target.value)}
                            />
                        </Col>
                        <Col span={4} >
                            <Select
                                defaultValue={selectedType || '选择分类'}
                                size="large"
                                key={selectedType}
                                onChange={(value) => setSelectedType(value)}
                            >
                                {
                                    typeInfo.map((item) => {
                                        return <Option key={item.id} value={item.id}>{item.typeName}</Option>
                                    })
                                }

                            </Select>
                        </Col>

                    </Row>
                    {/* 添加内容区 */}
                    <Row gutter={10} className='edit-content-container'>
                        <Col span={12} >
                            <TextArea onChange={handleChange}
                                value={articleContent}
                                className='markdow-content'
                                rows={25}
                                placeholder='博客内容'

                            />

                        </Col>
                        <Col span={12} >
                            <div className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>
                {/* 右侧 */}
                <Col span={6}>
                    <Row>
                        <Col span={24}>

                            <Button style={{ marginRight: 30 }}>
                                暂存文章
                            </Button>
                            <Button type="primary" onClick={saveArticle}>发布文章</Button>
                            <div className="date-select">
                                <DatePicker
                                    placeholder='发布日期'
                                    size="large"
                                    onChange={(date, dateString) => setShowDate(dateString)}
                                ></DatePicker>
                            </div>
                            <TextArea
                                value={introducemd}
                                onChange={introduceChange}
                                placeholder='文章简介'
                                rows={4}
                            >
                            </TextArea>
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: introducehtml }}
                            ></div>
                        </Col>
                    </Row>

                </Col>
            </Row >
        </div >
    )

}
export default AddArticle