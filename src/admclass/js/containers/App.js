import React,{Component} from 'react';
import {Frame} from "../../../common";

class App extends Component{
    render() {
        return (
            <Frame type="triangle" showLeftMenu={true}>
                <div ref="frame-time-barner">这是time-barner</div>
                <div ref="frame-left-menu">这是左侧菜单</div>
                <div ref="frame-right-content">内容区域</div>
            </Frame>
        );
    }
}
export default App;