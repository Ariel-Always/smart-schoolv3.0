import React,{Component} from 'react';
import {Frame} from "../../../common";
import {connect} from 'react-redux';
import {HashRouter as Router,Route,Link} from 'react-router-dom';

class App extends Component{
    render() {
        const {LoginUserInfo} = this.props;

        return (
            <Frame type="triangle" showLeftMenu={true}>
                <div ref="frame-time-barner">这是time-barner</div>
                <div ref="frame-left-menu">这是左侧菜单</div>
                <div ref="frame-right-content">内容区域</div>
            </Frame>
        );
    }
}
const  mapStateToProps = (state) => {
    let {LoginUserInfo} = state;
    return {
        LoginUserInfo
    }
};
export default connect(mapStateToProps)(App);