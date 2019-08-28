import React,{Component} from 'react';
import {Frame} from "../../../common";
import Fetch from './testFetch';
class App extends Component {

    
    componentWillMount(){
        sessionStorage.setItem('token','test')
    }
    render() {
        return (
            <div>
                <Frame userInfo={{
                    name: "张三",
                    image: "http://192.168.129.1:10101/LgTTFtp/UserInfo/Photo/Default/Nopic001.jpg?t=1565715681.39251"
                }}
                       module={{
                           cnname: "主页模块占位",
                           enname: "Index Page",
                           image: "http://192.168.129.1:10102/CloudMgr/Themes/skin/zh/Images/block-icon.png"
                       }}
                  showLeftMenu={true}
                >
                    <div ref="frame-time-barner">这是time-barner</div>
                    <div ref="frame-left-menu">这是左侧菜单</div>
                    <div ref="frame-right-content">
                        <Fetch></Fetch>
                    </div>
                </Frame>
            </div>
        );
    }
}
export default App;