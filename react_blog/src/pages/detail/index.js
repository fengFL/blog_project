import {
    Row,
    Col,
    Breadcrumb,
    Affix,
} from "antd"
import { FireOutlined, FolderOutlined, CalendarOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import Author from "../../components/Author"
import Footer from "../../components/Footer"
import Advert from "../../components/Advert"
import MarkNav from "markdown-navbar"
import "markdown-navbar/dist/navbar.css"
import "./index.css"
import marked from "marked"
import highLight from "highlight.js"
import "highlight.js/styles/monokai-sublime.css"
import servicePage from "../../config/apiUrl"
const Detail = (props) => {
    const [content, setContent] = useState('')
    const [html, setHtml] = useState('')
    const [id] = useState(props.match.params.id)
    useEffect(() => {

        const getArticleContent = async () => {
            const url = servicePage.getArticleById + `/${id}`
            const status = await fetch(url)
            const result = await status.json()
            setContent(result.data)
            // 解析markdown
            markedData(result.data)
        }
        getArticleContent()
    }, [id])

    const markedData = (data) => {
        // 配置解析markdown 文件 并让其显示高亮效果
        const renderer = new marked.Renderer()
        marked.setOptions({
            renderer, // 渲染方式
            gfm: true, // 启动类似github的 md
            pedatic: false, // false 可以让md文件有一定的容错率
            sanitize: false, // false 不忽略html标签
            tables: true,  //根据github输出表格样式 。这个为true gfm也必须为true
            breaks: false, // 是否支持github的换行符 必须gfm为true 才有效果
            smartLists: true, // 自动渲染列表，让列表有效果。默认为false
            highlight: function (code) { // 传递代码
                // 根基传递的code自动解析，效率低
                return highLight.highlightAuto(code).value
            }
        })
        // 将需要解析的md文件传入marked
        setHtml(marked(data.article_content))
    }

    return (
        <div>
            <Row className="comm-main" type="flex" justify="center" >
                <Col className="comm-left" xs={24} sm={24} md={12} lg={14} xl={14} >
                    <div>
                        <Breadcrumb separator=">" >
                            <Breadcrumb.Item href="/">
                                Home
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/list">
                                视频列表
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                技术开发
                            </Breadcrumb.Item>
                        </Breadcrumb>

                    </div>


                    <div className="detail-title">
                        {content.title}
                    </div>
                    <div className="list-icon detail-icon">
                        <span> <CalendarOutlined style={{ margin: ".5rem" }} /> {content.addTime}</span>
                        <span style={{ margin: ".5rem" }}><FireOutlined /> {content.view_count}</span>
                        <span><FolderOutlined /> {content.type_name}</span>
                    </div>
                    <div className="detail-context" dangerouslySetInnerHTML={{ __html: html }}>

                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={6} lg={6} xl={5}>
                    <Author />
                    <Advert />
                    <Affix offsetTop={5}>
                        <div className="detail-nav">
                            <div className="detail-nav-title">文章目录</div>
                            <MarkNav
                                source={content.article_content}
                                ordered={false}  // 给我们提供序号
                                headingTopOffset={1} // 距离顶部的距离
                            />
                        </div>
                    </Affix>

                </Col>
            </Row>
            <Footer />
        </div >
    )
}

export default Detail