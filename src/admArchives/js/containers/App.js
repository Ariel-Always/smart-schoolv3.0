import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert } from "../../../common";
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'
import logo from '../../images/admAriHeadImg-1.png'
import TimeBanner from '../component/TimeBanner'
import All from '../component/All'
import Student from '../component/Student'
import Teacher from '../component/Teacher'
import Leader from '../component/Leader'
import '../../scss/index.scss'
import $ from 'jquery'
import { getData } from '../../../common/js/fetch'
import actions from '../actions';
import { urlAll, proxy } from './config'

sessionStorage.setItem('token', 'null')
class App extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
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
                {
                    key: 'Leader',
                    title: '领导档案',
                    icon: 'menu35',
                    onTitleClick: this.handleClick,
                }]
            }
        }
        let route = history.location.pathname;
        //判断token是否存在
        if (sessionStorage.getItem('token')) {
            dispatch(actions.UpDataState.getLoginUser('/Login?method=GetUserInfo'));
            this.requestData(route);

        } else {
            //不存在的情况下
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            dispatch(actions.UpUIState.showErrorAlert({
                type: 'btn-error',
                title: "登录错误，请重新登录!",
                ok: this.onAppAlertOK.bind(this),
                cancel: this.onAppAlertCancel.bind(this),
                close: this.onAppAlertClose.bind(this)
            }));
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
            this.requestData(route)

            $('.frame_leftmenu_mainitem').removeClass('selected active');
            $('.frame_leftmenu_mainitem').children('*').removeClass('active');
            this.handleMenu()
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
        let handleRoute = route.split('/')[1];
        if (route === '/')
            {dispatch(actions.UpDataState.getAllUserPreview('/ArchivesAll'));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });}
        else {
            dispatch(actions.UpDataState.getAllUserPreview('/Archives' + handleRoute));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if(route === '/Student'){
                console.log('sds')
                if(!this.props.DataState.GradeClassMsg.returnData)
                dispatch(actions.UpDataState.getGradeClassMsg('/Archives' + handleRoute + '_DropDownMenu'));
                dispatch(actions.UpDataState.getGradeStudentPreview('/Archives' + handleRoute + '?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
            }
        }


    }
    //操作左侧菜单，响应路由变化
    handleMenu = () => {
        if (history.location.pathname === '/') {
            history.push('/All')
            console.log(this.state)
        }
        let path = history.location.pathname.substr(1);

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
                            cnname: "用户档案管理",
                            enname: "User profile management",
                            image: logo
                        }}
                        type="circle" showLeftMenu={true}>
                        <div ref="frame-time-barner"><TimeBanner /></div>
                        <div ref="frame-left-menu"><Menu params={this.state.MenuParams}></Menu></div>
                        <div ref="frame-right-content">
                            <Router history={BrowserRouter}>
                                <Route path='/All' history={history} component={All}></Route>
                                <Route path='/Student' history={history} component={Student}></Route>
                                <Route path='/Teacher' history={history} component={Teacher}></Route>
                                <Route path='/Leader' history={history} component={Leader}></Route>
                            </Router>
                        </div>
                    </Frame>
                </Loading>
                <Alert show={UIState.AppAlert.appAlert} 
                type={UIState.AppAlert.type} 
                title={UIState.AppAlert.title}
                    onOk={UIState.AppAlert.onOk} 
                    onCancel={UIState.AppAlert.onCancel} 
                    onClose={UIState.AppAlert.onClose}
                ></Alert>
                
            </React.Fragment>

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