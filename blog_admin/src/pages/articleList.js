import { List, Row, Col, Button, message, Modal } from "antd"
import React, { useState, useEffect, useRef } from "react"
import servicePath from "../config/apiUrl"
import "../static/css/articleList.css"

const ArticleList = (props) => {
    const [list, setList] = useState([])
    const _isMounted = useRef(true)
    console.log(_isMounted.current)
    const controller = new AbortController()
    async function getArticleList() {
        try {
            if (_isMounted.current) {
                const response = await fetch(servicePath.getArticleList, {
                    method: "GET",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                const res = await response.json()
                setList(res.data)
            }
        } catch (error) {
            message.error('网络繁忙，请稍后再试')
        }

    }

    useEffect(() => {
        getArticleList()
        return () => {
            // 取消发送请求
            // 关闭节流阀
            controller.abort()
            _isMounted.current = false
        }
    }, [list])

    // 点击编辑的方法
    const handleEdit = (id) => {

        props.history.push('/index/admin/add/' + id)
    }
    // 点击删除的方法
    const handleDel = (id, title) => {

        Modal.confirm({
            title: `确定删除标题为'${title}'的博客吗？`,
            onOk: async function () {
                const response = await fetch(servicePath.delArticle + id, {
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    mode: 'cors',
                    credentials: 'include'
                })
                const res = await response.json()
                if (res.code === 0) { // 删除成功
                    const newList = list.filter((item) => {
                        return item.id !== id
                    })
                    // 设置状态 必须 用一个不同地址的新数组
                    setList(newList)
                }
            }
        })
    }
    return (
        <div>
            <List header={
                <Row className="list-div">
                    <Col span={8}>
                        <b>标题</b>
                    </Col>
                    <Col span={4}>
                        <b>类别</b>
                    </Col>
                    <Col span={4}>
                        <b>发布时间</b>
                    </Col>
                    <Col span={4}>
                        <b>浏览量</b>
                    </Col>
                    <Col span={4}>
                        <b>操作</b>
                    </Col>
                </Row>
            }
                bordered
                dataSource={list}
                renderItem={(item) => {
                    return (
                        <List.Item>
                            <Row className="list-div">
                                <Col span={8}>
                                    {item.title}
                                </Col>
                                <Col span={4}>
                                    {item.typeName}
                                </Col>
                                <Col span={4}>
                                    {item.addTime}
                                </Col>
                                <Col span={4}>
                                    {item.view_count}
                                </Col>
                                <Col span={4}>
                                    <Button type="primary" className='edit-button' onClick={() => handleEdit(item.id)}>修改</Button>
                                    <Button onClick={() => handleDel(item.id, item.title)}>删除</Button>
                                </Col>
                            </Row>
                        </List.Item>)
                }
                }
            >
            </List >

        </div >
    )
}

export default ArticleList