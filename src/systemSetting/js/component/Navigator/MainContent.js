import React, { Component } from "react";
import LeftNav from '../Navigator/LeftNav';
import Frame from '../../../../common/Frame';
import { TokenCheck_Connect } from '../../../../common/js/disconnect';
import Semester from '../SettingOptions/YearSemesterSetting'
import School from '../SettingOptions/SchoolnfoSetting'
import Subsystem from '../SettingOptions/SubsystemAccessSetting'
import setting from '../../../images/setting_logo.png';
import { Menu } from '../../../../common'
import history from '../../containers/history'



import { connect } from 'react-redux';

import DataChange from '../../action/data/DataChange'
import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    BrowserRouter, Redirect
} from "react-router-dom";

class MainContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            MenuParams: {
                MenuBox: {
                    display: true,
                    width: 240,
                    MenuBoxTopPic: "pic8"
                },
                children: [
                    {
                        key: "Semester",
                        title: "学年学期设置",
                        icon: "menu38",
                        onTitleClick: this.handleClick.bind(this.key),
                        active: true,
                        selected: true
                    },
                    {
                        key: "School",
                        title: "学校基础资料设置",
                        icon: "menu44",
                        onTitleClick: this.handleClick.bind(this.key)
                    },
                    {
                        key: "Subsystem",
                        title: "子系统访问设置",
                        icon: "menu43",
                        onTitleClick: this.handleClick.bind(this.key)
                    },
                ]
            },
            route: false,
        }
        const { dispatch } = props;
        //判断是否登录成功
        TokenCheck_Connect();

        const Hash = location.hash;

        if (sessionStorage.getItem('UserInfo')) {
            const { SchoolID } = JSON.parse(sessionStorage.getItem('UserInfo'))
            dispatch(DataChange.getCurrentSemester(SchoolID));
            dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
            
            



        } else {

            //如果为登录成功则开启定时器,直到登录后获取到token
            let getUserInfo = setInterval(() => {

                if (sessionStorage.getItem('UserInfo')) {
                    const { SchoolID } = JSON.parse(sessionStorage.getItem('UserInfo'))
                    dispatch(DataChange.getCurrentSemester(SchoolID));
                    dispatch(DataChange.getCurrentSchoolInfo(SchoolID));
                    clearInterval(getUserInfo);
                }

            }, 20);

        }




    }

    //操作左侧菜单，响应路由变化
    handleMenu = () => {
        if (history.location.pathname === "/MainContent") {
            history.push("/MainContent/Semester");
        }
        let path = history.location.pathname.split("/")[2];
        // console.log(path);
        let param = this.state.MenuParams;
        let len = param.children.length;

        for (let i = 0; i < len; i++) {
            param.children[i]["active"] = false;
            param.children[i]["selected"] = false;
            if (path === param.children[i].key) {
                param.children[i]["active"] = true;
                param.children[i]["selected"] = true;
                this.setState({
                    MenuParams: param
                });
                // console.log(param)
            }
        }
    };
    //左侧菜单每项的点击事件
    handleClick = key => {
        // console.log(key);

        history.push("/MainContent/" + key);

        // console.log(this.state.MenuParams)
        // this.handleMenu();
    };


    render() {
        return (


            <Frame
                showLeftMenu={true}
                showBarner={false}
                type={"triangle"}
                module={{ image: setting, cnname: "系统设置", enname: "System Settings", type: "circle" }}
                userInfo={{ name: "张三" }}
            >
                <div ref="frame-left-menu">
                    {/* <LeftNav></LeftNav> */}
                    <Menu params={this.state.MenuParams} ></Menu>

                </div>

                <div ref="frame-right-content">

                    <Router>

                        <Route
                            path="/MainContent/Semester*"
                            exact
                            history={history}
                            component={Semester}
                        ></Route>

                        <Route
                            path="/MainContent/School*"
                            exact
                            history={history}
                            component={School}
                        ></Route>

                        <Route
                            path="/MainContent/Subsystem*"
                            exact
                            history={history}
                            component={Subsystem}
                        ></Route>
                        <Redirect path="/*" to="/MainContent/Semester"></Redirect>


                    </Router>

                </div>

            </Frame >



        );
    }
}


const mapStateToProps = (state) => {



    return {
        state
    }
}

export default connect(mapStateToProps)(MainContent);