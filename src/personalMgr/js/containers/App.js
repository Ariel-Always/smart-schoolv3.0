import React,{Component} from 'react';

import {Frame,Loading,Alert,MenuLeftNoLink,Modal} from "../../../common";

import {connect} from 'react-redux';

import { HashRouter as Router,Route,Switch,Redirect } from 'react-router-dom';

import ManagerContent from './Manager/ManagerContent';

import TeacherContent from './Teacher/TeacherContent';

import StudentContent from './Student/StudentContent'

import ModuleIndexActions from '../actions/ModuleIndexActions';

import MCIActions from '../actions/ModuleCommonInfoActions';

import logo from "../../images/logo.png";


class App extends Component{

    constructor(props) {

        super(props);

        const { dispatch } = props;

        dispatch(ModuleIndexActions.PageInit());

    }
    //点击menu
    menuClick(e){

        const { dispatch } = this.props;

        dispatch({type:MCIActions.MODULE_COMMON_INFO_MENU_CHANGE,data:e.ident});

    }

    render() {

        const { LoginUser } = this.props;

        console.log(LoginUser);

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
                        type="triangle"
                        showBarner={false}
                        showLeftMenu={true}>

                        <div ref="frame-left-menu">

                            <div className="frame_left_menu_pic clearfix">

                                <div className="header-pic"></div>

                                <div className="user-name"></div>

                            </div>

                            <MenuLeftNoLink Menu={Menu} menuClick={this.menuClick.bind(this)}></MenuLeftNoLink>

                        </div>


                        <div ref="frame-right-content">

                            <Router>

                                <Switch>

                                <Route path="/manager" exact component={ManagerContent}></Route>

                                <Route path="/teacher" exact component={TeacherContent}></Route>

                                <Route path="/student" exact component={StudentContent}></Route>

                                {

                                    LoginUser&&LoginUser.UserType === 0?

                                        <Redirect path="/*" to={{pathname:"/manager"}}></Redirect>

                                     :''
                                }

                                {

                                    LoginUser&&LoginUser.UserType === 1?

                                        <Redirect  path="/*" to={{pathname:"/teacher"}}></Redirect>

                                        :''

                                }

                                {

                                    LoginUser&&LoginUser.UserType === 2?

                                        <Redirect  path="/*" to={{pathname:"/student"}}></Redirect>

                                        :''

                                }

                            </Switch>

                            </Router>

                        </div>

                    </Frame>



               </Loading>

           </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {

    const { LoginUser } = state;

    return {

        LoginUser

    }

};

export default connect(mapStateToProps)(App);