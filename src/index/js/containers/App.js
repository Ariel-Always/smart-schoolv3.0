import React,{Component} from 'react';

import { Loading,Alert } from "../../../common";

import AppAlertActions from '../actions/AppAlertActions';

import LoginUserActions from '../actions/LoginUserActions';

import { connect } from 'react-redux';

import TeacherDeskTop from './Teacher/Index';

import ManagerDeskTop from './Manager/Index';


class App extends Component {

    constructor(props){

        super(props);

        this.PageBefore(props);

    }


    //界面加载前的操作
    PageBefore(props){

        const { dispatch } = props;

        //判断本地token是否存在
        if(sessionStorage.getItem("token")){

            //获取用户信息并且加载界面

            dispatch(LoginUserActions.getUserInfo());

        }else{

            const lg_tk = this.getQueryString('lg_tk');

            sessionStorage.setItem("token","6a547099-cc4a-4cb0-88f6-062804b42153");

            //判断URL中token是否存在

            if (lg_tk){

                //获取用户信息并且加载界面

                sessionStorage.setItem("token",lg_tk);

                dispatch(LoginUserActions.getUserInfo());

            }else{

                //弹出登录提示警告弹窗

                dispatch(AppAlertActions.alertWarn(

                    {title:"您还没有登录，请重新登录",ok:()=>{ return LoginUserActions.GoToLogin }}

                    ));

            }

        }

    }



    //拦截并获取界面参数

     getQueryString(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

        var r = window.location.search.substr(1).match(reg);

        if (r != null) return (r[2]); return null;

    }


    componentWillMount(){



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

                    LoginUser.UserType === 0?

                        <ManagerDeskTop></ManagerDeskTop>

                        :''

                }

                {

                    LoginUser.UserType === 1?

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