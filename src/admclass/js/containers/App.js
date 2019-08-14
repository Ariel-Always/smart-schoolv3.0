import React,{Component} from 'react';
import {Frame,Loading,Button} from "../../../common";
import {connect} from 'react-redux';
import {HashRouter as Router,Route,Link} from 'react-router-dom';
import actions from '../actions';
import logo from '../../images/logo.png';

class App extends Component{
    constructor(props) {
        super(props);
        const {dispatch} = props;
        dispatch(actions.UserInfo.getUserInfo('/loginUser'));
    }

    //在组件加载前判断是否登录等信息
    componentWillMount(){
    }


    render() {
        const {LoginUserInfo,UIState} = this.props;
        console.log(LoginUserInfo);
        return (
            <Loading tip="加载中..." spinning={UIState.appLoading}>
                <Frame type="triangle" showLeftMenu={true} userInfo={{name:LoginUserInfo.username,image:LoginUserInfo.image}} module={{cnname:"行政班管理",enname:"Administration class management",image:logo}}>
                    <div ref="frame-time-barner">
                        <Button size="small" color="red" type="default" shape="round">添加班级</Button>
                    </div>
                    <div ref="frame-left-menu">这是左侧菜单</div>
                    <div ref="frame-right-content">内容区域</div>
                </Frame>
            </Loading>
        );
    }
}
const  mapStateToProps = (state) => {
    let {LoginUserInfo,UIState} = state;
    return {
        LoginUserInfo,
        UIState
    }
};
export default connect(mapStateToProps)(App);