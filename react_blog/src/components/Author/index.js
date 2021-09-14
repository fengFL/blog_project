import "./index.css"
import {
    Avatar,
    Divider,

} from "antd"
import { QqOutlined, WechatOutlined, GithubOutlined } from "@ant-design/icons"
const Author = () => {
    return (
        <div className="author-container">
            <div >
                <Avatar
                    size={100}
                    src="http://img.touxiangkong.com/uploads/allimg/20203301301/2020/3/JzQjya.jpg"
                />

            </div>
            <div className="author-introduction">
                热爱生活，热爱编码 <br />
                Love life, love coding.
                <Divider>社交账号</Divider>

                <Avatar className="author-avatar" size={40} icon={<WechatOutlined />} />
                <Avatar className="author-avatar" size={40} icon={<QqOutlined />} />
                <Avatar className="author-avatar" size={40} icon={<GithubOutlined />} />
            </div>
        </div>
    )
}
export default Author