import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert ,LeftMenu} from "../../../common";
import { connect } from 'react-redux';


import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'

import logo from '../../images/SubjectLogo.png'
//import TimeBanner from '../component/TimeBanner'

//import Subject from '../component/Subject'
import '../../scss/index.scss'
import $ from 'jquery'
import { getData } from '../../../common/js/fetch'
import actions from '../actions';
//import { urlAll, proxy } from './config'

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
        console.log(route)
        if (route === '/') {
            //dispatch(actions.UpDataState.getAllUserPreview('/ArchivesAll'));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            // if (!this.props.DataState.PeriodMsd)
            //     dispatch(actions.UpDataState.getPeriodMsg('/AdmSubject_DropDownMenu?schoolID=sss'));
            // dispatch(actions.UpDataState.getSubjectMsg('/AdmSubject?schoolID=schoolID&periodID=null&pageSize=8&pageIndex=1'));
            // if(!this.props.DataState.SubjectMsg.addSubjectMsg)
            // dispatch(actions.UpDataState.getSubjectModalMsg('/AddSubject_DropDownMenu?schoolID=schoolID'));
            
        } else {
            history.push('/')
        }


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
                            cnname: "教学班管理",
                            enname: "CoureClass Management",
                            image: logo
                        }}
                        type="triangle" showBarner={true} showLeftMenu={true}>
                        <div ref="frame-time-barner"></div>

                        <div ref="frame-right-content">
                            <Menu
                            params={this.state.MenuParams}
                            >

                            </Menu>
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