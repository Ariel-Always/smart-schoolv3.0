import React,{Component} from 'react';

import {Frame,Loading,Alert,MenuLeftNoLink} from "../../../common";

import { TokenCheck_Connect } from "../../../common/js/disconnect";

import {connect} from 'react-redux';

import BaseSetting from './BaseSetting';

import SafeSetting from "./SafeSetting";

import AuthorSetting from "./AuthorSetting";

import MCIActions from '../actions/ModuleCommonInfoActions';

import LoginUserActions from '../actions/LoginUserActions';

import AppAlertActions from '../actions/AppAlertActions';

import logo from "../../images/logo.png";



class App extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        TokenCheck_Connect();

        if (sessionStorage.getItem('UserInfo')){

            let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

            dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});

            dispatch({type:MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,data:"base"});


        }else{


            let getUserInfo = setInterval(()=>{

                if (sessionStorage.getItem('UserInfo')){

                    let UserInfo = JSON.parse(sessionStorage.getItem('UserInfo'));

                    dispatch({type:LoginUserActions.UPDATE_LOGIN_USER,data:UserInfo});

                    dispatch({type:MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,data:"base"});

                    clearInterval(getUserInfo);

                }

            },20);

        }



    }
    //点击menu
    menuClick(e){

        const { dispatch } = this.props;

        dispatch({type:MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,data:e.ident});

    }


    LogOut(e){

        const { dispatch } = this.props;

        dispatch(AppAlertActions.alertWarn({title:"您确定要退出登录？",ok:()=>{ return ()=>this.GoOut() }}));

    }


    //GoOut

    GoOut(){

        sessionStorage.clear();

        window.location.href='/UserMgr/Login/Login.aspx';

    }

    render() {

        const { LoginUser,ModuleCommonInfo,AppAlert,AppLoading } = this.props;

        let Component = '';

        let Menu = [

            {name:"基本资料",menu:"menu31",ident:"base",default:true},

            {name:"账号安全",menu:"menu29",ident:"safe",default:false},

            {name:"第三方登录账号",menu:"menu30",ident:"author",default:false},

            ];

        return (

           <React.Fragment>

               <Loading size="large" tip="加载中..." spinning={AppLoading.show} opacity={false}>

                        <Frame
                        module={{
                            cnname: "个人账号管理",
                            enname: "Personal Account Management",
                            image: logo
                        }}
                        userInfo={{
                            name:LoginUser.UserName,
                            image:LoginUser.PhotoPath
                        }}
                        type="triangle"
                        showBarner={false}
                        showLeftMenu={true}
                        onLogOut={this.LogOut.bind(this)}
                        >

                        <div ref="frame-left-menu">

                            <div className="frame_left_menu_pic clearfix">

                                <div className="header-pic" style={{backgroundImage:`url(${LoginUser.PhotoPath})`}}></div>

                                <div className="user-name">{LoginUser.UserName}</div>

                            </div>

                            <MenuLeftNoLink Menu={Menu} menuClick={this.menuClick.bind(this)}></MenuLeftNoLink>

                        </div>


                        <div ref="frame-right-content">

                            {

                                ModuleCommonInfo.menuActive==='base'?

                                    <BaseSetting></BaseSetting>:''

                            }

                            {

                                ModuleCommonInfo.menuActive==='safe'?

                                    <SafeSetting></SafeSetting>:''

                            }

                            {

                                ModuleCommonInfo.menuActive==='author'?

                                    <AuthorSetting></AuthorSetting>:''

                            }

                        </div>

                    </Frame>

               </Loading>

               <Alert
                   show={AppAlert.show}
                   type={AppAlert.type}
               onOk={AppAlert.ok}
               onCancel={AppAlert.cancel}
               onHide={AppAlert.hide}
               title={AppAlert.title}
               abstract={AppAlert.abstract}>

               </Alert>

           </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    const { LoginUser,ModuleCommonInfo,AppAlert,AppLoading } = state;

    return {

        LoginUser,

        ModuleCommonInfo,

        AppAlert,

        AppLoading

    }

};

export default connect(mapStateToProps)(App);