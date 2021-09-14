import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import "../static/css/adminIndex.css"
import React, { useState, useEffect } from "react"
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom"
import AddArticle from "./addArticle"
import Login from "./login"
import ArticleList from "./articleList"
import { Link } from "react-router-dom"
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props) {

    // 让列表一开始是打开的
    const [collapsed, setCollapsed] = useState(false)
    // if (!localStorage.getItem('openId')) {
    //     props.history.replace('/')
    // }
    useEffect(() => {

    })
    let pathName = props.location.pathname
    if (pathName.startsWith('/index/admin/add')) {
        pathName = '/index/admin/add'
    }
    let openKey = ''
    if (pathName.startsWith('/index/admin')) {
        openKey = '/index/admin'
    }

    console.log(openKey)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark"
                    selectedKeys={[pathName]}
                    mode="inline"
                    defaultOpenKeys={[openKey]}
                >
                    <Menu.Item
                        key="/index"
                        icon={<PieChartOutlined />}
                    >
                        <Link to="/index">工作台</Link>

                    </Menu.Item>
                    <Menu.Item key="/index/add" icon={<DesktopOutlined />}>
                        <Link to="/index/add">添加文章</Link>

                    </Menu.Item>
                    <SubMenu key="/index/admin" icon={<UserOutlined />} title="文章管理">
                        <Menu.Item key="/index/admin/add">
                            <Link to="/index/admin/add">添加文章</Link>
                        </Menu.Item>
                        <Menu.Item key="/index/admin/list">
                            <Link to="/index/admin/list">文章列表</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="9" icon={<FileOutlined />}>
                        留言管理
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: "100%" }}>
                        <div>

                            <Switch>
                                <Route path="/index" exact component={AddArticle} />
                                <Route path="/index/add" exact component={AddArticle} />
                                <Route path="/index/admin/add" exact component={AddArticle} />
                                <Route path="/index/admin/list" exact component={ArticleList} />
                                <Route path="/index/admin/add/:id" excat component={AddArticle} />
                            </Switch>

                        </div>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>F-blog-system</Footer>
            </Layout>
        </Layout>
    );
}


export default AdminIndex