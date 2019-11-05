import React,{Component} from 'react';

import {Frame,Alert} from './index.js';

import { LogOut } from "./js/disconnect";

import dynamicFile from 'dynamic-file';


class FrameContainer extends Component{

    constructor(props) {

        super(props);

        this.state={

            LoadingShow:false

        }

    }

    componentDidMount(){

        if (sessionStorage.getItem('UserInfo')){

            this.IntegrateMsg();

        }else{

            let WaitUserInfo = setInterval(()=>{

                if (sessionStorage.getItem('UserInfo')){

                    this.IntegrateMsg();

                    clearInterval(WaitUserInfo);

                }

            },20);

        }

    }

    //集成消息模块函数
    IntegrateMsg(){

        let token = sessionStorage.getItem('token');

        let host = `http://${window.location.host}/`;

        let PsnMgrLgAssistantAddr = 'http://192.168.129.1:10103';

        sessionStorage.setItem('PsnMgrToken',token);//用户Token

        sessionStorage.setItem('PsnMgrMainServerAddr', host); //基础平台IP地址和端口号 形如：http://192.168.129.1:30103/

        sessionStorage.setItem('PsnMgrLgAssistantAddr','http://192.168.129.1:10103/');

        dynamicFile([

            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/css/lancoo.cp.assistantInfoCenter.css`,

            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

        ]).then(()=>{

            dynamicFile([

                `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/lancoo.cp.assistantInfoCenter.js`

            ])

        })

    }


    //点击退出登录
    AlertOk(){

        LogOut();

    }

    //点击退出登录弹窗取消

    AlertClose(){

        this.setState({LoadingShow:false});

    }

    //退出登录
    Logout(){

        this.setState({LoadingShow:true});

    }


    render() {

        const { children, type, module, userInfo, msg, showLeftMenu, showBarner,contentShow,onLogOut, ...reset } = this.props;

        return (

            <React.Fragment>

                <Frame

                type={type}

                module={module}

                userInfo={userInfo}

                showLeftMenu={showLeftMenu}

                showBarner={showBarner}

                onLogOut={this.Logout.bind(this)}

                contentShow={contentShow}

                {...reset}

            >

                { children }

            </Frame>

                <Alert
                    type="btn-warn"
                    title="您确定要退出登录么?"
                    show={this.state.LoadingShow}
                    onOk={this.AlertOk.bind(this)}
                    onCancel={this.AlertClose.bind(this)}
                    onClose={this.AlertClose.bind(this)}
                >

                </Alert>

            </React.Fragment>

        );

    }

}

export default FrameContainer;