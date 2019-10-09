import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert } from "../../../common";
import { connect } from 'react-redux';
import Introduce from '../component/Introduce'
import { TokenCheck_Connect, TokenCheck } from '../../../common/js/disconnect'

import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'

import logo from '../../images/admAccoHeadImg-1.png'
//import TimeBanner from '../component/TimeBanner'

import Student from '../component/Student'
import Teacher from '../component/Teacher'
import Leader from '../component/Leader'
import Admin from '../component/Admin'
import '../../scss/index.scss'
import $ from 'jquery'
import { getData } from '../../../common/js/fetch'
import actions from '../actions';
//import { urlAll, proxy } from './config'

class App extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        this.state = {
            MenuParams: {
                MenuBox: {
                    display: true,
                    width: 240,
                    MenuBoxTopPic: 'pic10'
                },
                children: [
                    {
                        key: 'Student',
                        title: '学生账号管理',
                        icon: 'menu39',
                        onTitleClick: this.handleClick,
                    },
                    {
                        key: 'Teacher',
                        title: '教师账号管理',
                        icon: 'menu33',
                        onTitleClick: this.handleClick,
                    },
                    // {
                    //     key: 'Leader',
                    //     title: '领导账号管理',
                    //     icon: 'menu35',
                    //     onTitleClick: this.handleClick,
                    // },
                    {
                        key: 'Admin',
                        title: '管理员账号管理',
                        icon: 'menu34',
                        onTitleClick: this.handleClick,
                    }]
            }
        }
        let route = history.location.pathname;
        // TokenCheck()
        TokenCheck_Connect()
        //判断token是否存在
        // if (sessionStorage.getItem('token')) {
        // dispatch(actions.UpDataState.getLoginUser('/Login?method=GetUserInfo'));
        this.requestData(route);
        if (sessionStorage.getItem('UserInfo'))
            dispatch(actions.UpDataState.getLoginUser(sessionStorage.getItem('UserInfo')));
        // } else {
        //     //不存在的情况下
        //     dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        //     dispatch(actions.UpUIState.showErrorAlert({
        //         type: 'btn-error',
        //         title: "登录错误，请重新登录!",
        //         ok: this.onAppAlertOK.bind(this),
        //         cancel: this.onAppAlertCancel.bind(this),
        //         close: this.onAppAlertClose.bind(this)
        //     }));
        // }
    }



    componentWillMount() {
        //this.handleMenu()
        let route = history.location.pathname;
        // 获取接口数据
        //this.requestData(route)

        this.handleMenu()
        history.listen(() => {//路由监听
            let route = history.location.pathname;

            // 获取接口数据
            this.requestData(route)

            this.handleMenu()

            // if (history.location.pathname === '/' || history.location.pathname === '/UserAccount') {
            //     history.push('/UserAccount/All')
            //     console.log(this.state)
            // }
            // if (history.location.pathname === '/RegisterExamine' ) {
            //     history.push('/RegisterExamine/RegisterWillExamine')
            //     console.log(this.state)
            // }
        })
    }
    componentWillUpdate() {

    }
    componentDidUpdate() {

    }


    onAppAlertOK() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
        window.location.href = "/html/login"
    }
    onAppAlertCancel() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    onAppAlertClose() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
    }
    // 请求每个组件主要渲染的数据
    requestData = (route) => {
        const { dispatch } = this.props;
        let pathArr = route.split('/');
        let handleRoute = pathArr[1];

        if (route === '/') {
            //dispatch(actions.UpDataState.getAllUserPreview('/ArchivesAll'));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });


        } else if (handleRoute === 'Student') {
            //dispatch(actions.UpDataState.getAllUserPreview('/Archives' + handleRoute));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!this.props.DataState.GradeClassMsg.returnData.grades)
                dispatch(actions.UpDataState.getGradeClassMsg('/GetGradeClassTree'));
            dispatch(actions.UpDataState.getGradeStudentPreview('/GetStudentToPage?SchoolID=school1&PageIndex=0&PageSize=10'));

        } else if (handleRoute === 'Teacher') {

            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!this.props.DataState.SubjectTeacherMsg.returnData)
                dispatch(actions.UpDataState.getSubjectTeacherMsg('/GetSubject'));
            dispatch(actions.UpDataState.getSubjectTeacherPreview('/GetTeacherToPage?SchoolID=school1&PageIndex=0&PageSize=10'));
        } else if (handleRoute === 'Leader') {
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
        } else if (handleRoute === 'Admin') {
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            dispatch(actions.UpDataState.getAdminPreview('/GetAdminToPage?SchoolID=school1&PageIndex=0&PageSize=10'));

        } else {
            history.push('/')
        }


    }
    //操作左侧菜单，响应路由变化
    handleMenu = () => {
        $('.frame_leftmenu_mainitem').removeClass('selected active');
        $('.frame_leftmenu_mainitem').children('*').removeClass('active');
        let path = history.location.pathname.split('/')[1];

        let param = this.state.MenuParams;
        let len = param.children.length;
        for (let i = 0; i < len; i++) {
            param.children[i]['active'] = false;
            param.children[i]['selected'] = false;
            if (path === param.children[i].key) {
                param.children[i]['active'] = true;
                param.children[i]['selected'] = true;

            }
        }
        this.setState({
            MenuParams: param
        })
    }
    //左侧菜单每项的点击事件
    handleClick = (key) => {

        history.push('/' + key);
    }
    //每个组件的下拉菜单的数据请求
    AllDropDownMenu = (route) => {

    }


    render() {
        const { UIState, DataState } = this.props;

        return (
            <React.Fragment>
                <Loading tip="加载中..." size="large" spinning={UIState.AppLoading.appLoading}>


                    <Frame userInfo={{
                        name: DataState.LoginUser.UserName,
                        image: DataState.LoginUser.PhotoPath
                    }}

                        module={{
                            cnname: "用户账号管理",
                            enname: "User Account Management",
                            image: logo
                        }}
                        type="triangle" showBarner={false} showLeftMenu={true}>
                        {/* <div ref="frame-time-barner"><TimeBanner /></div> */}
                        <div ref="frame-left-menu"><Menu params={this.state.MenuParams}></Menu></div>
                        <div ref="frame-right-content">
                            <Router >
                                <Route path='/' history={history} exact component={Introduce}></Route>
                                <Route path='/Student' history={history} component={Student}></Route>
                                <Route path='/Teacher' exact history={history} component={Teacher}></Route>
                                <Route path='/Leader' exact history={history} component={Leader}></Route>
                                <Route path='/Admin' exact history={history} component={Admin}></Route>
                            </Router>
                        </div>
                    </Frame>



                </Loading>
                <Alert show={UIState.AppAlert.appAlert}
                    type={UIState.AppAlert.type}
                    abstract={UIState.AppAlert.littleTitle}
                    title={UIState.AppAlert.title}
                    onOk={UIState.AppAlert.onOk}
                    onCancel={UIState.AppAlert.onCancel}
                    onClose={UIState.AppAlert.onClose}
                ></Alert>

            </React.Fragment >

        );
    }
}
const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(App);