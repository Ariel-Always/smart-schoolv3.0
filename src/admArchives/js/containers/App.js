import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert } from "../../../common";
import { connect } from 'react-redux';
import UserArchives from "../component/UserArchives";

import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'
import RegisterExamine from "../component/RegisterExamine";
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


            if (history.location.pathname === '/' || history.location.pathname === '/UserArchives') {
                history.push('/UserArchives/All')
                console.log(this.state)
            }
            if (history.location.pathname === '/RegisterExamine' ) {
                history.push('/RegisterExamine/RegisterWillExamine')
                console.log(this.state)
            }
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
        let handleRoute = pathArr[2];
        if (route === '/' || route.split('/')[1] === 'UserArchives') {
            dispatch(actions.UpDataState.getAllUserPreview('/ArchivesAll'));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (handleRoute) {
                dispatch(actions.UpDataState.getAllUserPreview('/Archives' + handleRoute));
                dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
                if (route === '/UserArchives/Student') {
                    console.log('Student')
                    if (!this.props.DataState.GradeClassMsg.returnData)
                        dispatch(actions.UpDataState.getGradeClassMsg('/ArchivesStudent_DropDownMenu'));
                    dispatch(actions.UpDataState.getGradeStudentPreview('/ArchivesStudent?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
                }
                if (route === '/UserArchives/Teacher') {
                    console.log('Teacher')
                    if (!this.props.DataState.GradeClassMsg.returnData)
                        dispatch(actions.UpDataState.getGradeClassMsg('/ArchivesStudent_DropDownMenu'));
                    dispatch(actions.UpDataState.getSubjectTeacherPreview('/ArchivesTeacher?SchoolID=schoolID&GradeID=gradeID&ClassID=ClassID&PageIndex=0&PageSize=10&SortFiled=UserID&SortType=ASC'));
                }
            }

        }
        else if (route.split('/')[1] === 'RegisterExamine') {
            //dispatch(actions.UpDataState.getAllUserPreview('/RegisterExamine'));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!this.props.DataState.GradeClassMsg.returnData)
                dispatch(actions.UpDataState.getGradeClassMsg('/ArchivesStudent_DropDownMenu'));
        }


    }
    //操作左侧菜单，响应路由变化
    handleMenu = () => {
        if (history.location.pathname === '/' || history.location.pathname === '/UserArchives') {
            history.push('/UserArchives/All')
            console.log(this.state)
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



                    <Router >

                        <Route path='/UserArchives' component={UserArchives}></Route>
                        <Route path='/RegisterExamine'  component={RegisterExamine}></Route>
                    </Router>

                </Loading>
                <Alert show={UIState.AppAlert.appAlert}
                    type={UIState.AppAlert.type}
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