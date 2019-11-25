import React,{Component} from 'react';

import { Loading,Alert } from "../../../common";

import {TokenCheck_Connect} from "../../../common/js/disconnect";

import LoginUserActions from '../actions/LoginUserActions';

import { connect } from 'react-redux';

import TeacherDeskTop from './Teacher/Index';

import ManagerDeskTop from './Manager/Index';

import Bs2CsCommon from "../actions/Bs2CsCommon";

import BTCActions from '../actions/BsToCsActions';

class App extends Component {

    constructor(props){

        super(props);

        const { dispatch } = props;

        TokenCheck_Connect(true);

        if (sessionStorage.getItem('UserInfo')){

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            const {UserType} = UserInfo;

            if (parseInt(UserType)===0||parseInt(UserType)===1){

                dispatch({type:LoginUserActions.LOGIN_USER_INFO_UPDATE,data:UserInfo});

                window.BsToCs = new Bs2CsCommon((e)=>dispatch(this.BsToCsCallBack(e)));

            }else{

                window.location.href='/Error.aspx?errcode=E011';

            }

        }else{


            let getUserInfo = setInterval(()=>{

                if (sessionStorage.getItem('UserInfo')){

                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                    const {UserType} = UserInfo;

                    if (parseInt(UserType)===0||parseInt(UserType)===1){

                        dispatch({type:LoginUserActions.LOGIN_USER_INFO_UPDATE,data:UserInfo});

                        window.BsToCs = new Bs2CsCommon((e)=>dispatch(this.BsToCsCallBack(e)));

                    }else{

                        window.location.href='/Error.aspx?errcode=E011';

                    }

                    clearInterval(getUserInfo);

                }

            },20)

        }

    }

    //判断是否有基础平台的插件
     BsToCsCallBack(data){

        return dispatch=>{

            if (data){

                dispatch({type:BTCActions.BTC_TO_TRUE});

            }else{

                dispatch({type:BTCActions.BTC_TO_FALSE});

            }

        }

    }


    render() {

        const { AppAlert,LoginUser,AppLoading } = this.props;

        return (

            <div className="desk-top-wrapper">

                {

                    AppLoading.show?

                        <Loading tip="加载中请稍后..." size="large" opacity={false}></Loading>

                        :''

                }

                {

                    LoginUser.UserType === "0"?

                        <ManagerDeskTop></ManagerDeskTop>

                        :''

                }

                {

                    LoginUser.UserType === "1"?

                    <TeacherDeskTop></TeacherDeskTop>

                    :''

                }

                <Alert
                    type={AppAlert.type}
                    title={AppAlert.title}
                    onOk={AppAlert.ok}
                    onCancel={AppAlert.cancel}
                    onHide={AppAlert.hide}
                    onClose={AppAlert.close}
                    show={AppAlert.show}
                >

                </Alert>


            </div>

        );

    }

}


const mapStateToProps = (state)=>{

    const { LoginUser,AppAlert,AppLoading } = state;

    return {

        LoginUser,

        AppAlert,

        AppLoading

    }

};

export default connect(mapStateToProps)(App);