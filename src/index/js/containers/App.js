import React,{Component} from 'react';

import { Loading,Alert } from "../../../common";

import {TokenCheck_Connect, TokenCheck, getUserInfo} from "../../../common/js/disconnect";

import AppAlertActions from '../actions/AppAlertActions';

import LoginUserActions from '../actions/LoginUserActions';

import { connect } from 'react-redux';

import TeacherDeskTop from './Teacher/Index';

import ManagerDeskTop from './Manager/Index';


class App extends Component {

    constructor(props){

        super(props);

        const { dispatch } = props;

        TokenCheck_Connect(true);

        if (sessionStorage.getItem('UserInfo')){

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            dispatch({type:LoginUserActions.LOGIN_USER_INFO_UPDATE,data:UserInfo});

        }else{


            let getUserInfo = setInterval(()=>{

                if (sessionStorage.getItem('UserInfo')){

                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                    dispatch({type:LoginUserActions.LOGIN_USER_INFO_UPDATE,data:UserInfo});

                    clearInterval(getUserInfo);

                }

            },20)

        }

        //this.PageBefore(props);

    }



    //界面加载前的操作
    PageBefore(props) {



    }





    //拦截并获取界面参数

     getQueryString(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

        var r = window.location.search.substr(1).match(reg);

        if (r != null) return (r[2]); return null;

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