import React,{Component} from 'react';

import {Frame,Alert} from './index.js';

import { getData } from "./js/fetch";

import { LogOut } from "./js/disconnect";

import CONFIG from './js/config';

import dynamicFile from 'dynamic-file';


class FrameContainer extends Component{

    constructor(props) {

        super(props);

        this.state={

            AlertShow:false

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

        this.GetMethod().then(data=>{

            if (data){

                let PsnMgrLgAssistantAddr = data.WebSvrAddr;

                sessionStorage.setItem('PsnMgrToken',token);//用户Token

                sessionStorage.setItem('PsnMgrMainServerAddr', host); //基础平台IP地址和端口号 形如：http://192.168.129.1:30103/

                sessionStorage.setItem('PsnMgrLgAssistantAddr',PsnMgrLgAssistantAddr);

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

        });

    }


    //点击退出登录
    AlertOk(){

        LogOut();

    }

    //点击退出登录弹窗取消

    AlertClose(){

        this.setState({AlertShow:false});

    }

    //退出登录
    Logout(){

        this.setState({AlertShow:true});

    }


    async GetMethod(){

        const result = await getData(CONFIG.Import+'/Base/GetSingleSubsystemServer?SysID=200',1);

        const res = await result.json();

        if (res.StatusCode===200){

            return res.Data;

        }

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
                    type="btn-query"
                    title="您确定要退出登录么?"
                    show={this.state.AlertShow}
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