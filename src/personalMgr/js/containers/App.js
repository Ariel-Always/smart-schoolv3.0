import React,{Component} from 'react';

import {Frame,Loading,Alert,MenuLeftNoLink,Modal} from "../../../common";

import {connect} from 'react-redux';

import BaseSetting from './BaseSetting';

import SafeSetting from "./SafeSetting";

import AuthorSetting from "./AuthorSetting";

import MCIActions from '../actions/ModuleCommonInfoActions';

import logo from "../../images/logo.png";


class App extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

    }
    //点击menu
    menuClick(e){

        const { dispatch } = this.props;

        dispatch({type:MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,data:e.ident});

    }

    render() {

        const { LoginUser,ModuleCommonInfo } = this.props;

        let Component = '';

        let Menu = [

            {name:"基本资料",menu:"menu31",ident:"base",default:true},

            {name:"账号安全",menu:"menu29",ident:"safe",default:false},

            {name:"第三方登录账号",menu:"menu30",ident:"author",default:false},

            ];

        return (

           <React.Fragment>

               <Loading size="large" tip="加载中..." spinning={false} opacity={false}>

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
                        showLeftMenu={true}>

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

           </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    const { LoginUser,ModuleCommonInfo } = state;

    return {

        LoginUser,

        ModuleCommonInfo

    }

};

export default connect(mapStateToProps)(App);