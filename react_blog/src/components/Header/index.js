import {
    Row,
    Col,
    Menu,
} from "antd"
import {
    HomeOutlined,
    SmileOutlined,
    YoutubeOutlined,
    MessageOutlined,
} from "@ant-design/icons"
import "./index.css"
import { withRouter } from "react-router-dom"
import React, { useState, useEffect } from "react"
import servicePath from "../../config/apiUrl"
const { Item } = Menu

const Header = (props) => {
    const [type, setType] = useState([])
    useEffect(() => {
        const getTypeInfo = async () => {
            const url = servicePath.getTypeInfo
            const pre_result = await fetch(url)
            const result = await pre_result.json()
            // 将返回的数组存入 type 里
            setType(result.data)
        }
        getTypeInfo()
    }, [])

    const handleClick = (e) => {
        if (e.key === 'home') {
            props.history.push('/')
        } else {
            props.history.push(`/list/${e.key}`)
        }
    }
    return (
        <div className="header">
            <Row type="flex" justify="center" >
                {/* xs 小于 756  */}
                <Col xs={24} sm={24} md={10} lg={10} xl={10} >
                    <span className="header-logo">个人博客</span>
                    <span className="header-text">记录生活学习的点滴</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={10} xl={10}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Item key="home">
                            <HomeOutlined />
                            <span style={{ marginLeft: ".6rem" }} >首页</span>
                        </Item>
                        {type.map((item) => {
                            return (
                                <Item key={item.id}>
                                    {
                                        item.id === 1 ? <YoutubeOutlined /> :

                                            item.id === 2 ? <MessageOutlined /> :
                                                item.id === 3 ? <SmileOutlined /> : null
                                    }
                                    <span style={{ marginLeft: ".6rem" }} >{item.typeName}</span>
                                </Item>
                            )
                        })}
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(Header)
