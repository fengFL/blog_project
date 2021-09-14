import {
    Row,
    Col,
    List,
    message,
} from "antd"
import { FireOutlined, FolderOutlined, CalendarOutlined } from "@ant-design/icons"
import "./index.css"
import React, { useState, useEffect } from "react"
import Author from "../Author"
import Footer from "../Footer"
import servicePath from "../../config/apiUrl"
import { Link } from "react-router-dom"

const Content = () => {
    const [articleList, setArticleList] = useState([])

    useEffect(() => {
        // 发送请求获取数据
        const getArticleList = async () => {
            try {
                // 获取fetch的返回状态

                const pre_result = await fetch(servicePath.getArticleList)
                // 结果在pre_result里的json() 里面
                const result = await pre_result.json()
                setArticleList(result.data)
                console.log(result.data)
                return () => {

                }

            } catch (error) {
                message.error('网络错误')
            }

        }
        getArticleList()

    }, [])
    return (
        <div>
            <Row className="comm-main" type="flex" justify="center" >
                <Col className="comm-left" xs={24} sm={24} md={12} lg={14} xl={14} >
                    <List
                        header={<div>最新日志</div>}
                        dataSource={articleList}
                        itemLayout="vertical"
                        renderItem={item => (
                            <List.Item>

                                <div className="list-title">
                                    <Link to={`/list/detail/${item.id}`} >
                                        {item.title}

                                    </Link>
                                </div>
                                <div className="list-icon">
                                    <span> <CalendarOutlined style={{ margin: ".5rem" }} /> {item.addTime}</span>
                                    <span style={{ margin: ".5rem" }}><FireOutlined /> {item.view_count}</span>
                                    <span><FolderOutlined /> {item.typeName}</span>

                                </div>
                                <div className="list-context">{item.introduce}</div>
                            </List.Item>

                        )}
                    />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={6} lg={6} xl={5}>
                    <Author />
                </Col>
            </Row>
            <Footer />
        </div>
    )
}
export default Content