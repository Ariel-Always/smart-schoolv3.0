import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert } from "../../../common";
import { connect } from 'react-redux';
import { TokenCheck_Connect, TokenCheck, getUserInfo } from '../../../common/js/disconnect'


import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'

import logo from '../../images/SubjectLogo.png'
//import TimeBanner from '../component/TimeBanner'
import config from '../../../common/js/config'
import Subject from '../component/Subject'
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
            UserMsg: props.DataState.LoginUser

        }
        let route = history.location.pathname;
        //判断token是否存在
        TokenCheck_Connect()
        this.requestData(route);
        let token = sessionStorage.getItem('token')
        // sessionStorage.setItem('UserInfo', '')
        if (sessionStorage.getItem('UserInfo')) {
            dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
        }
        else {
            getUserInfo(token, '000');
            let timeRun = setInterval(function () {
                if (sessionStorage.getItem('UserInfo')) {
                    dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
                    clearInterval(timeRun)
                }
            }, 1000)
            //dispatch(actions.UpDataState.getLoginUser(JSON.parse(sessionStorage.getItem('UserInfo'))));
        }
    }



    componentWillMount() {

        let route = history.location.pathname;
        // 获取接口数据



        history.listen(() => {//路由监听
            let route = history.location.pathname;
            console.log(route)

        })
    }
    componentWillUpdate() {

    }
    componentDidUpdate() {

    }


    onAppAlertOK() {
        const { dispatch } = this.props;
        dispatch(actions.UpUIState.hideErrorAlert());
        //window.location.href = "/html/login"
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
        const { dispatch,DataState } = this.props;
        let UserMsg = DataState.LoginUser.SchoolID?DataState.LoginUser:JSON.parse(sessionStorage.getItem('UserInfo'))
        

        let pathArr = route.split('/');
        let handleRoute = pathArr[1];
        console.log(route)
        if (route === '/') {
            //dispatch(actions.UpDataState.getAllUserPreview('/ArchivesAll'));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            if (!this.props.DataState.PeriodMsd)
                dispatch(actions.UpDataState.getPeriodMsg('/GetPeriodBySchoolID?schoolID=' + UserMsg.SchoolID));
            dispatch(actions.UpDataState.getSubjectMsg('/GetSchoolSubjectInfo?schoolID=' + UserMsg.SchoolID + '&periodID=&pageSize=8&pageIndex=1'));
            if (!this.props.DataState.SubjectMsg.addSubjectMsg)
                dispatch(actions.UpDataState.getSubjectModalMsg('/GetSubjectInfoForAddBySchool?schoolID=' + UserMsg.SchoolID));

        } else {
            history.push('/')
        }


    }



    render() {
        const { UIState, DataState } = this.props;

        return (
            <React.Fragment>
                <Loading opacity={false} tip="加载中..." size="large" spinning={UIState.AppLoading.appLoading}>


                    <Frame userInfo={{
                        name: DataState.LoginUser.UserName,
                        image: DataState.LoginUser.PhotoPath
                    }}

                        module={{
                            cnname: "学科管理",
                            enname: "Subject Management",
                            image: logo
                        }}
                        type="triangle" showBarner={false} showLeftMenu={false}>
                        {/* <div ref="frame-time-barner"><TimeBanner /></div> */}

                        <div ref="frame-right-content">
                            <Subject></Subject>
                        </div>
                    </Frame>



                </Loading>
                <Alert show={UIState.AppAlert.appAlert}
                    type={UIState.AppAlert.type}
                    abstract={UIState.AppAlert.littleTitle}
                    title={UIState.AppAlert.title}
                    onOk={UIState.AppAlert.onOk}
                    onHide={UIState.AppAlert.onHide}
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