import {
    Row,
    Col,
    List,
    Breadcrumb,
} from "antd"
import { FireOutlined, FolderOutlined, CalendarOutlined } from "@ant-design/icons"
import React, { useEffect, useState, } from "react"
import Author from "../../components/Author"
import Footer from "../../components/Footer"
import { Link } from "react-router-dom"
import servicePath from "../../config/apiUrl"

const MyList = (props) => {

    const [articles, setArticles] = useState([])
    const id = parseInt(props.match.params.id)

    useEffect(() => {
        const getArticles = async () => {
            const url = servicePath.getArticlesByTypeId + id
            // 发送请求 获取数据
            const result = await fetch(url, {
                method: "GET",
            })
            const data = await result.json()
            setArticles(data.data)
        }
        getArticles()
        return () => {
        }

    }, [id])
    return (
        <div>
            <Row className="comm-main" type="flex" justify="center" >
                {/* 左侧 */}
                <Col className="comm-left" xs={24} sm={24} md={12} lg={14} xl={14} >
                    <div>
                        <Breadcrumb separator=">" >
                            <Breadcrumb.Item href="/">
                                首页
                            </Breadcrumb.Item>
                            <Breadcrumb.Item >
                                {id === 1 ? '视频教程' : id === 2 ? '学习宇宙' : id === 3 ? '快乐生活' : null}
                            </Breadcrumb.Item>
                        </Breadcrumb>

                    </div>
                    <List

                        dataSource={articles}
                        itemLayout="vertical"
                        renderItem={item => (
                            <List.Item>

                                <div className="list-title">
                                    <Link to={`/list/detail/${item.id}`}>{item.title}</Link>
                                </div>
                                <div className="list-icon">
                                    <span> <CalendarOutlined style={{ margin: ".5rem" }} />{item.addTime}</span>
                                    <span style={{ margin: ".5rem" }}><FireOutlined /> {item.view_count}</span>
                                    <span><FolderOutlined /> {item.typeName}</span>

                                </div>
                                <div className="list-context">{item.introduce}</div>
                            </List.Item>

                        )}
                    />
                </Col>
                {/* 右侧 */}
                <Col className="comm-right" xs={0} sm={0} md={6} lg={6} xl={5}>
                    <Author />

                </Col>
            </Row>
            <Footer />
        </div>
    )
}
export default MyList