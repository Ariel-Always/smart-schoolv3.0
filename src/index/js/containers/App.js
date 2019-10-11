import React,{Component} from 'react';

import { Loading,Alert } from "../../../common";

import {TokenCheck_Connect} from "../../../common/js/disconnect";

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