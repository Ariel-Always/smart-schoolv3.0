import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert, LeftMenu, Modal } from "../../../common";
import { connect } from 'react-redux';
import CONFIG from '../../../common/js/config';
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import history from './history'
import logo from '../../images/img-userPower.png'
import PowerContent from '../component/PowerContent'
import '../../scss/index.scss'
import $ from 'jquery'
import { postData, getData } from '../../../common/js/fetch'

import actions from '../actions';
//import { urlAll, proxy } from './config'

sessionStorage.setItem('token', 'null')
class App extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        this.state = {
            PowerMsg : []
        }
        
    }



    componentWillMount() {
        const { dispatch, DataState } = this.props;
        let route = history.location.pathname;
        //判断token是否存在
        if (sessionStorage.getItem('token')) {
            dispatch(actions.UpDataState.getLoginUser('/Login?method=GetUserInfo'));
            dispatch({ type: actions.UpUIState.APP_LOADING_CLOSE });
            dispatch({type:actions.UpUIState.RIGHT_LOADING_OPEN})
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
        
        // 获取接口数据


        history.listen(() => {//路由监听
            let route = history.location.pathname;
            //this.requestData(route);
            //this.requestData(route);

        })


    }
    componentWillUpdate() {
        //this.requestData(route);
    }
    componentDidUpdate() {

    }
    componentWillReceiveProps(nextProps) {
        const {DataState,UIState,dispatch} = nextProps;
        console.log(DataState.LoginUser.SchoolID,!DataState.GetUserPowerMsg.Power)
        if(DataState.LoginUser.SchoolID&& !DataState.GetUserPowerMsg.Power){
            let school = DataState.LoginUser.SchoolID
            dispatch(actions.UpDataState.getUserPowerMsg('/GetGlobalUserPower?SchoolID=school1'));
        
            
        }
       
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
                            cnname: "用户权限管理",
                            enname: "User Access Management",
                            image: logo
                        }}
                        type="triangle" showBarner={false} showLeftMenu={false}>
                     

                        <div ref="frame-right-content">
                            <Loading opacity={false} tip="加载中..." size="large" spinning={UIState.AppLoading.rightLoading}>
                               <PowerContent></PowerContent>
                            </Loading>
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