import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../images/admAriHeadImg-1.png'
import { Frame, Menu, Loading, Alert } from "../../../common";
import { HashRouter as Router,  Route, Link, BrowserRouter } from 'react-router-dom';
import history from '../containers/history'
import TimeBanner from './TimeBanner'
import All from './All'
import Student from './Student'
import Teacher from './Teacher'
import Leader from './Leader'
import $ from 'jquery'
import '../../scss/index.scss'
import { getData } from '../../../common/js/fetch'





class UserArchives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MenuParams: {
                MenuBox: {
                    display: true,
                    width: 240,
                    MenuBoxTopPic: 'pic1'
                },
                children: [{
                    key: 'All',
                    title: '用户档案总览',
                    icon: 'menu10',
                    onTitleClick: this.handleClick,
                    active: true,
                    selected: true
                },
                {
                    key: 'Student',
                    title: '学生档案',
                    icon: 'menu39',
                    onTitleClick: this.handleClick,
                },
                {
                    key: 'Teacher',
                    title: '教师档案',
                    icon: 'menu33',
                    onTitleClick: this.handleClick,
                },
                    // {
                    //     key: 'Leader',
                    //     title: '领导档案',
                    //     icon: 'menu35',
                    //     onTitleClick: this.handleClick,
                    // }
                ]
            }
        }

    }

    componentWillMount() {
        this.handleMenu()
        let route = history.location.pathname;
        // 获取接口数据
        //this.requestData(route)

        history.listen(() => {//路由监听
            let route = history.location.pathname;
            // 获取接口数据


            $('.frame_leftmenu_mainitem').removeClass('selected active');
            $('.frame_leftmenu_mainitem').children('*').removeClass('active');
            this.handleMenu()
        })
    }


    //操作左侧菜单，响应路由变化
    handleMenu = () => {
        if (history.location.pathname === '/UserArchives') {
            history.push('/UserArchives/All')
        }
        let path = history.location.pathname.split('/')[2];
        console.log(path)
        let param = this.state.MenuParams;
        let len = param.children.length;

        for (let i = 0; i < len; i++) {
            param.children[i]['active'] = false;
            param.children[i]['selected'] = false;
            if (path === param.children[i].key) {
                param.children[i]['active'] = true;
                param.children[i]['selected'] = true;
                this.setState({
                    MenuParams: param
                })
            }
        }
    }
    //左侧菜单每项的点击事件
    handleClick = (key) => {
        console.log(key)
        if(key!=='All')
        history.push('/UserArchives/' + key+'/all');
        else{
        history.push('/UserArchives/' + key);

        }
    }
    //每个组件的下拉菜单的数据请求
    AllDropDownMenu = (route) => {

    }

    render() {
        const { UIState, DataState } = this.props;

        return (
            <React.Fragment>
                <Frame userInfo={{
                    name: DataState.LoginUser.UserName,
                    image: DataState.LoginUser.PhotoPath
                }}

                    module={{
                        cnname: "用户档案管理",
                        enname: "User profile management",
                        image: logo
                    }}
                    type="circle" showLeftMenu={true} showBarner={false}>
                    <div ref="frame-time-barner"><TimeBanner /></div>
                    <div ref="frame-left-menu"><Menu params={this.state.MenuParams}></Menu></div>
                    <div ref="frame-right-content">
                        <Loading size={'large'} opacity={false} spinning={UIState.AppLoading.RightLoading}>
                            <Route path='/UserArchives/All'  history={history} component={All}></Route>
                            <Route path='/UserArchives/Student/:GradeID'  history={history} component={Student}></Route>
                            <Route path='/UserArchives/Teacher/:SubjectID'  history={history} component={Teacher}></Route>
                            <Route path='/UserArchives/Leader' history={history} component={Leader}></Route>
                        </Loading>
                    </div>
                </Frame>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};

export default connect(mapStateToProps)(UserArchives)