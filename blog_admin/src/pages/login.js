import React, { useState, useEffect } from "react"
import {
    Card, Form, Button, Spin,
    Input, message,
} from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import "../static/css/login.css"
import servicePath from "../config/apiUrl"
import AdminIndex from "./adminIndex.js"

function Login(props) {
    // const [username, setUsername] = useState('') // 存储用户名
    // const [password, setPassword] = useState('') // 储存密码
    const [isloading, setIsloading] = useState(false)

    // useEffect(() => {
    // }, [username])
    // 在最开始 获取一下 本地是否有用户名和密码
    if (localStorage.getItem('openId')) {
        props.history.replace('/index')
    }
    const onFinish = async (values) => {
        const { username, password } = values

        if (username === '' || password === '') {
            message.error('请输入用户名')
            return false
        }
        // setUsername(username)
        setIsloading(true)
        // 发送请求，获取数据
        try {
            const result = await fetch(servicePath.checkLogin, {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                },
                credentials: 'include'
            })
            const data = await result.json()
            setIsloading(false)
            const { code, openId } = data
            if (code === 0) { // 返回的状态码是0
                // 将session保存到本地
                localStorage.setItem('openId', openId)
                props.history.replace('/index')
            } else if (code === 1) { // 返回的状态码是1
                message.error('用户名或密码错误')
            }
        } catch (e) {
            // 如果请求过程中出现异常，处理异常 并关闭spinning。
            setTimeout(() => {
                setIsloading(false)
                message.error('网络繁忙，请稍后再试')
            }, 2000);
        }


    };
    return (

        <div className="login-container">
            <Spin tip='loading...' spinning={isloading} >
                <Card className="login-card"
                    title='F_blog_admin-system'
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        </div>
    )
}
export default Login